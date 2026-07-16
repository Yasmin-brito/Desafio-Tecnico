namespace ExpenseControl.DTOs.Report
{
    /// <summary>
    /// Contrato de resposta do relatório de saldo consolidado.
    /// Agrega o detalhamento por usuário e os totais gerais para consumo direto pelo frontend.
    /// </summary>
    public class ReportBalanceResponseDto
    {
        /// <summary>Linhas do relatório, uma por usuário cadastrado.</summary>
        public List<UserBalanceDto> rows { get; set; } = [];

        /// <summary>Soma de todas as receitas no período filtrado.</summary>
        public decimal totalIncome { get; set; }

        /// <summary>Soma de todas as despesas no período filtrado.</summary>
        public decimal totalExpense { get; set; }

        /// <summary>Saldo líquido geral (receitas menos despesas).</summary>
        public decimal totalBalance { get; set; }
    }
}
