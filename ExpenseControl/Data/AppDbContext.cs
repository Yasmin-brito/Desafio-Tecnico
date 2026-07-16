using ExpenseControl.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Data
{
    /// <summary>
    /// Contexto principal do Entity Framework Core para a aplicação.
    /// Representa a sessão com o banco PostgreSQL e expõe os conjuntos de entidades do domínio.
    /// </summary>
    public class AppDbContext : DbContext
    {
        /// <summary>
        /// Cria o contexto com as opções de conexão configuradas em <c>Program.cs</c>.
        /// </summary>
        /// <param name="options">Opções de provedor, connection string e comportamento do EF Core.</param>
        public AppDbContext(DbContextOptions options) : base(options) { }

        /// <summary>Conjunto de pessoas cadastradas no sistema.</summary>
        public DbSet<User> Users { get; set; }

        /// <summary>Conjunto de transações financeiras (receitas e despesas).</summary>
        public DbSet<Transaction> Transfers { get; set; }

        /// <summary>
        /// Aplica automaticamente todas as classes <see cref="IEntityTypeConfiguration{TEntity}"/>
        /// do assembly, mantendo o mapeamento organizado por entidade.
        /// </summary>
        /// <param name="modelBuilder">Construtor do modelo relacional do EF Core.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
        }
    }
}
