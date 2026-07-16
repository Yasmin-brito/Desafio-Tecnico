namespace ExpenseControl.Models.Enums
{
    /// <summary>
    /// Classifica o tipo de movimentação financeira.
    /// Valores numéricos explícitos garantem persistência estável no banco e contratos previsíveis na API.
    /// </summary>
    public enum TransactionType
    {
        /// <summary>Entrada de recursos (receita).</summary>
        Income = 0,

        /// <summary>Saída de recursos (despesa).</summary>
        Expense = 1
    }
}
