namespace ExpenseControl.DTOs.Report
{
    /// <summary>
    /// Representa o resumo financeiro de um único usuário em um período.
    /// Evita expor a entidade completa e concentra apenas os dados necessários ao relatório.
    /// </summary>
    public class UserBalanceDto
    {
        /// <summary>Identificador do usuário.</summary>
        public Guid userId { get; set; }

        /// <summary>Nome exibido no relatório.</summary>
        public string? name { get; set; }

        /// <summary>Total de receitas do usuário no período.</summary>
        public decimal incomeSum { get; set; }

        /// <summary>Total de despesas do usuário no período.</summary>
        public decimal expenseSum { get; set; }

        /// <summary>Saldo do usuário (receitas menos despesas).</summary>
        public decimal balance { get; set; }
    }
}
