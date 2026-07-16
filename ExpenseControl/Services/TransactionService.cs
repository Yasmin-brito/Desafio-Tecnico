using ExpenseControl.Data;
using ExpenseControl.DTOs.Transaction;
using ExpenseControl.Models;
using ExpenseControl.Models.Enums;
using ExpenseControl.Models.PagedResult;
using ExpenseControl.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Services
{
    /// <summary>
    /// Implementa as operações de transações financeiras com validações de negócio.
    /// Concentra regras como vínculo com usuário existente e restrição de receita para menores de idade.
    /// </summary>
    public class TransactionService : ITransactionService
    {
        private readonly AppDbContext _context;

        /// <summary>
        /// Injeta o contexto de dados para persistência e consulta de transações.
        /// </summary>
        /// <param name="context">Sessão do Entity Framework com o banco PostgreSQL.</param>
        public TransactionService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Cria uma transação após validar o usuário e aplicar regras de permissão por idade.
        /// Menores de 18 anos não podem registrar receitas, conforme regra de negócio do domínio.
        /// </summary>
        /// <param name="dto">Dados da transação enviados pela API.</param>
        /// <returns>Transação persistida mapeada para o DTO de resposta.</returns>
        /// <exception cref="KeyNotFoundException">Quando o usuário informado não existe.</exception>
        /// <exception cref="ArgumentException">Quando um menor tenta registrar receita.</exception>
        public async Task<TransactionResponseDto> createTransaction(CreateTransactionDto dto)
        {
            var user = await _context.Users.FindAsync(dto.userId);

            if (user is null)
            {
                throw new KeyNotFoundException("User not found");
            }

            if (user.age < 18 && dto.type == TransactionType.Income)
            {
                throw new ArgumentException("user does not have permission to post income");
            }

            var transaction = new Transaction
            {
                description = dto.description,
                value = dto.value,
                type = dto.type,
                userId = dto.userId
            };

            _context.Transfers.Add(transaction);

            await _context.SaveChangesAsync();

            transaction.user = user;

            return toDto(transaction);
        }

        /// <summary>
        /// Lista transações paginadas, incluindo o nome do usuário para exibição na interface.
        /// A ordenação decrescente por data prioriza as movimentações mais recentes.
        /// </summary>
        /// <param name="pageNumber">Número da página (base 1).</param>
        /// <param name="pageSize">Quantidade de itens por página.</param>
        /// <returns>Resultado paginado com DTOs de transação.</returns>
        public async Task<PagedResult<TransactionResponseDto>> listTransactions(int pageNumber, int pageSize)
        {
            var transactions = await _context.Transfers
                .AsNoTracking()
                .Include(t => t.user)
                .OrderByDescending(t => t.createdAt)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var totalRecords = await _context.Transfers.CountAsync();

            return new PagedResult<TransactionResponseDto>(transactions.Select(toDto).ToList(), totalRecords, pageNumber, pageSize);
        }

        /// <summary>
        /// Converte a entidade <see cref="Transaction"/> para o contrato de resposta da API.
        /// Centraliza o mapeamento para evitar duplicação entre criação e listagem.
        /// </summary>
        /// <param name="t">Entidade de transação com navegação de usuário opcionalmente carregada.</param>
        /// <returns>DTO pronto para serialização JSON.</returns>
        private static TransactionResponseDto toDto(Transaction t)
        {
            return new TransactionResponseDto
            {
                id = t.id,
                description = t.description,
                value = t.value,
                type = t.type,
                createdAt = t.createdAt,
                userName = t.user?.name
            };
        }
    }
}
