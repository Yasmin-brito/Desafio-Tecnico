using ExpenseControl.DTOs.Transaction;
using ExpenseControl.Models.PagedResult;

namespace ExpenseControl.Services.Interfaces
{
    /// <summary>
    /// Contrato da camada de aplicação para operações com transações financeiras.
    /// Encapsula regras de negócio e acesso a dados, mantendo controllers enxutos.
    /// </summary>
    public interface ITransactionService
    {
        /// <summary>
        /// Persiste uma nova transação após validar a existência do usuário e regras de permissão.
        /// </summary>
        /// <param name="dto">Dados de entrada da transação.</param>
        /// <returns>Transação criada mapeada para o DTO de resposta.</returns>
        Task<TransactionResponseDto> createTransaction(CreateTransactionDto dto);

        /// <summary>
        /// Retorna transações paginadas, da mais recente para a mais antiga.
        /// </summary>
        /// <param name="pageNumber">Número da página (base 1).</param>
        /// <param name="pageSize">Quantidade de itens por página.</param>
        /// <returns>Resultado paginado com metadados de navegação.</returns>
        Task<PagedResult<TransactionResponseDto>> listTransactions(int pageNumber, int pageSize);
    }
}
