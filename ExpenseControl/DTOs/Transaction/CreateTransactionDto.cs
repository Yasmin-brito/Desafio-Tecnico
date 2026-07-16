using ExpenseControl.Models.Enums;

namespace ExpenseControl.DTOs.Transaction
{
    /// <summary>
    /// Contrato de entrada para criação de uma transação financeira.
    /// Separa o payload da API da entidade persistida, permitindo evoluir o modelo sem quebrar clientes.
    /// </summary>
    public class CreateTransactionDto
    {
        /// <summary>Descrição livre da movimentação.</summary>
        public string? description { get; set; }

        /// <summary>Valor monetário da transação.</summary>
        public decimal value { get; set; }

        /// <summary>Tipo da transação: receita (<see cref="TransactionType.Income"/>) ou despesa (<see cref="TransactionType.Expense"/>).</summary>
        public TransactionType type { get; set; }

        /// <summary>Identificador do usuário proprietário da transação.</summary>
        public Guid userId { get; set; }
    }
}
