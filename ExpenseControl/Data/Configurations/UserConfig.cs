using ExpenseControl.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ExpenseControl.Data.Configurations
{
    /// <summary>
    /// Define o mapeamento e o relacionamento da entidade <see cref="User"/> no banco de dados.
    /// Isola configurações de persistência para manter o modelo de domínio enxuto.
    /// </summary>
    public class UserConfig : IEntityTypeConfiguration<User>
    {
        /// <summary>
        /// Configura propriedades do usuário e o relacionamento um-para-muitos com transações.
        /// A exclusão em cascata garante integridade referencial ao remover um usuário.
        /// </summary>
        /// <param name="builder">Construtor fluente fornecido pelo Entity Framework.</param>
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(u => u.name)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(u => u.age)
                .IsRequired();

            builder.HasMany(u => u.transactions)
                .WithOne(t => t.user)
                .HasForeignKey(t => t.userId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
