using ExpenseControl.Models.Enums;

namespace ExpenseControl.DTOs.Transaction
{
    /// <summary>
    /// Contrato de saída após criação ou consulta de transações.
    /// Inclui dados derivados (como o nome do usuário) para evitar requisições adicionais no cliente.
    /// </summary>
    public class TransactionResponseDto
    {
        /// <summary>Identificador único da transação.</summary>
        public Guid id { get; set; }

        /// <summary>Descrição da movimentação.</summary>
        public string? description { get; set; }

        /// <summary>Valor monetário registrado.</summary>
        public decimal value { get; set; }

        /// <summary>Tipo da transação (receita ou despesa).</summary>
        public TransactionType type { get; set; }

        /// <summary>Data e hora de criação em UTC.</summary>
        public DateTime createdAt { get; set; }

        /// <summary>Nome do usuário vinculado, para exibição em listagens.</summary>
        public string? userName { get; set; }
    }
}
