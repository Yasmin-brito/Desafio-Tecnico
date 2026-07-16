using System.ComponentModel.DataAnnotations;
using ExpenseControl.Models.Enums;

namespace ExpenseControl.Models
{
    /// <summary>
    /// Representa uma movimentação financeira (receita ou despesa) vinculada a um usuário.
    /// É a entidade central do controle de gastos residenciais.
    /// </summary>
    public class Transaction
    {
        /// <summary>Chave primária gerada automaticamente.</summary>
        [Key]
        public Guid id { get; set; }

        /// <summary>Descrição livre da transação.</summary>
        public string? description { get; set; }

        /// <summary>Valor monetário da movimentação.</summary>
        public decimal value { get; set; }

        /// <summary>Classificação entre receita e despesa.</summary>
        public TransactionType type { get; set; }

        /// <summary>Momento de criação em UTC, usado em filtros de relatório.</summary>
        public DateTime createdAt { get; set; } = DateTime.UtcNow;

        /// <summary>Chave estrangeira do usuário proprietário.</summary>
        public Guid userId { get; set; }

        /// <summary>Navegação para o usuário associado.</summary>
        public User? user { get; set; }
    }
}
