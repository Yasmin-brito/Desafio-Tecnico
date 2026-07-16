using ExpenseControl.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ExpenseControl.Data.Configurations
{
    /// <summary>
    /// Define o mapeamento e as restrições da entidade <see cref="Transaction"/> no banco de dados.
    /// Centraliza regras de schema (tamanhos, precisão monetária e obrigatoriedade) fora do modelo de domínio.
    /// </summary>
    public class TransactionConfig : IEntityTypeConfiguration<Transaction>
    {
        /// <summary>
        /// Configura colunas, tipos e validações da tabela de transações via Fluent API.
        /// </summary>
        /// <param name="builder">Construtor fluente fornecido pelo Entity Framework.</param>
        public void Configure(EntityTypeBuilder<Transaction> builder)
        {
            builder.Property(t => t.description)
                .IsRequired()
                .HasMaxLength(250);
            builder.Property(t => t.value)
                .IsRequired()
                .HasPrecision(18, 2);

            builder.Property(t => t.type)
                .IsRequired();

            builder.Property(t => t.createdAt)
                .IsRequired();

            builder.Property(t => t.userId)
                .IsRequired();
        }
    }
}
