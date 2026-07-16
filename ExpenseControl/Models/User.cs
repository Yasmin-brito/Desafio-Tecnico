using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseControl.Models
{
    /// <summary>
    /// Representa uma pessoa cadastrada no sistema de controle de gastos.
    /// Agrupa as transações financeiras de um membro do domicílio.
    /// </summary>
    [Table("users")]
    public class User
    {
        /// <summary>Chave primária gerada automaticamente.</summary>
        [Key]
        public Guid id { get; set; }

        /// <summary>Nome da pessoa.</summary>
        public string? name { get; set; }

        /// <summary>Idade usada em validações de negócio no cadastro de receitas.</summary>
        public int age { get; set; }

        /// <summary>Transações financeiras pertencentes a este usuário.</summary>
        public ICollection<Transaction> transactions { get; set; }
            = new List<Transaction>();
    }
}
