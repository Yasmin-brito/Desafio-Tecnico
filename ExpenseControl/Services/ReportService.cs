using ExpenseControl.Data;
using ExpenseControl.DTOs.Report;
using ExpenseControl.Models.Enums;
using ExpenseControl.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Services
{
    /// <summary>
    /// Implementa a geração de relatórios financeiros agregando transações por usuário.
    /// Utiliza projeções no banco (LINQ traduzido para SQL) para evitar carregar dados desnecessários em memória.
    /// </summary>
    public class ReportService : IReportService
    {
        private readonly AppDbContext _context;

        /// <summary>
        /// Injeta o contexto de dados para consultas de leitura ao relatório.
        /// </summary>
        /// <param name="context">Sessão do Entity Framework com o banco PostgreSQL.</param>
        public ReportService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Monta o relatório de saldo por usuário e os totais consolidados no período informado.
        /// Usuários sem movimentações no intervalo aparecem com valores zerados.
        /// </summary>
        /// <param name="startDate">Data inicial opcional; padrão: 30 dias antes de <paramref name="endDate"/>.</param>
        /// <param name="endDate">Data final opcional; padrão: momento atual em UTC.</param>
        /// <returns>DTO com linhas por usuário e totais de receita, despesa e saldo.</returns>
        /// <exception cref="ArgumentException">Quando a data inicial é posterior à data final.</exception>
        public async Task<ReportBalanceResponseDto> getBalance(DateTime? startDate, DateTime? endDate)
        {
            var (start, end) = resolveDateRange(startDate, endDate);

            var users = await _context.Users
                .AsNoTracking()
                .Select(u => new
                {
                    userId = u.id,
                    name = u.name,
                    incomeSum = u.transactions
                        .Where(t => t.type == TransactionType.Income && t.createdAt >= start && t.createdAt <= end)
                        .Sum(t => (decimal?)t.value) ?? 0,
                    expenseSum = u.transactions
                        .Where(t => t.type == TransactionType.Expense && t.createdAt >= start && t.createdAt <= end)
                        .Sum(t => (decimal?)t.value) ?? 0,
                })
                .ToListAsync();

            var rows = users.Select(x => new UserBalanceDto
            {
                userId = x.userId,
                name = x.name,
                incomeSum = x.incomeSum,
                expenseSum = x.expenseSum,
                balance = x.incomeSum - x.expenseSum
            }).ToList();

            return new ReportBalanceResponseDto
            {
                rows = rows,
                totalIncome = rows.Sum(r => r.incomeSum),
                totalExpense = rows.Sum(r => r.expenseSum),
                totalBalance = rows.Sum(r => r.balance)
            };
        }

        /// <summary>
        /// Resolve o intervalo efetivo de consulta aplicando valores padrão e normalização de datas.
        /// Garante que filtros por dia inteiro incluam todas as transações do período em UTC.
        /// </summary>
        /// <param name="startDate">Data inicial informada pelo cliente, se houver.</param>
        /// <param name="endDate">Data final informada pelo cliente, se houver.</param>
        /// <returns>Tupla com início e fim do intervalo já normalizados.</returns>
        private static (DateTime start, DateTime end) resolveDateRange(DateTime? startDate, DateTime? endDate)
        {
            var end = endDate.HasValue
                ? normalizeEnd(endDate.Value)
                : DateTime.UtcNow;

            var start = startDate.HasValue
                ? normalizeStart(startDate.Value)
                : end.AddDays(-30);

            if (start > end)
            {
                throw new ArgumentException("startDate must be before or equal to endDate");
            }

            return (start, end);
        }

        /// <summary>
        /// Normaliza uma data para o primeiro instante do dia em UTC (00:00:00).
        /// Usado como limite inferior inclusivo em filtros de intervalo.
        /// </summary>
        /// <param name="date">Data informada pelo cliente; apenas ano, mês e dia são considerados.</param>
        /// <returns>DateTime em UTC representando o início do dia informado.</returns>
        private static DateTime normalizeStart(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, 0, 0, 0, DateTimeKind.Utc);
        }

        /// <summary>
        /// Normaliza uma data para o último instante do dia em UTC (23:59:59.9999999).
        /// Usado como limite superior inclusivo em filtros de intervalo (ex.: createdAt &lt;= end).
        /// </summary>
        /// <param name="date">
        /// Data informada pelo cliente; apenas ano, mês e dia são considerados — o horário é ignorado.
        /// Deve ser usada em conjunto com <see cref="normalizeStart"/> para definir o intervalo completo.
        /// </param>
        /// <returns>DateTime em UTC representando o fim do dia informado.</returns>
        private static DateTime normalizeEnd(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, 0, 0, 0, DateTimeKind.Utc)
                .AddDays(1)
                .AddTicks(-1);
        }
    }
}
