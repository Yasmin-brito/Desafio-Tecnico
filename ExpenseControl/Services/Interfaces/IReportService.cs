using ExpenseControl.DTOs.Report;

namespace ExpenseControl.Services.Interfaces
{
    /// <summary>
    /// Contrato da camada de aplicação para geração de relatórios financeiros.
    /// Permite desacoplar controllers da implementação concreta e facilita testes unitários.
    /// </summary>
    public interface IReportService
    {
        /// <summary>
        /// Calcula receitas, despesas e saldo por usuário dentro de um intervalo de datas.
        /// </summary>
        /// <param name="startDate">Data inicial opcional do filtro.</param>
        /// <param name="endDate">Data final opcional do filtro.</param>
        /// <returns>Relatório consolidado com linhas por usuário e totais gerais.</returns>
        Task<ReportBalanceResponseDto> getBalance(DateTime? startDate, DateTime? endDate);
    }
}
