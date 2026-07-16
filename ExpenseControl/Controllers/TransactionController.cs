using ExpenseControl.DTOs.Transaction;
using ExpenseControl.Models.PagedResult;
using ExpenseControl.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Controllers
{
    /// <summary>
    /// Expõe endpoints REST para criação e listagem de transações financeiras.
    /// A regra de negócio permanece na camada de serviços; o controller apenas orquestra as requisições HTTP.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        /// <summary>
        /// Inicializa o controller com o serviço de transações injetado pelo container de DI.
        /// </summary>
        /// <param name="transactionService">Serviço responsável pela persistência e validação de transações.</param>
        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        /// <summary>
        /// Registra uma nova transação (receita ou despesa) vinculada a um usuário.
        /// </summary>
        /// <param name="dto">Dados da transação enviados no corpo da requisição.</param>
        /// <returns>Transação criada com identificador gerado e data de criação.</returns>
        [HttpPost]
        public async Task<ActionResult<TransactionResponseDto>> create(CreateTransactionDto dto)
        {
            var transaction = await _transactionService.createTransaction(dto);

            return Created(string.Empty, transaction);
        }

        /// <summary>
        /// Lista transações de forma paginada, ordenadas da mais recente para a mais antiga.
        /// </summary>
        /// <param name="pageNumber">Número da página (base 1).</param>
        /// <param name="pageSize">Quantidade de registros por página.</param>
        /// <returns>Conjunto paginado de transações com metadados de navegação.</returns>
        [HttpGet("{pageNumber:int}/{pageSize:int}")]
        public async Task<ActionResult<PagedResult<TransactionResponseDto>>> list(int pageNumber = 1, int pageSize = 2)
        {
            var transactions = await _transactionService.listTransactions(pageNumber, pageSize);

            return Ok(transactions);
        }
    }
}
