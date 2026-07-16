namespace ExpenseControl.DTOs.User
{
    /// <summary>
    /// Contrato de entrada para cadastro de uma nova pessoa.
    /// Contém apenas os campos editáveis pelo cliente; o identificador é gerado pelo sistema.
    /// </summary>
    public class CreateUserDto
    {
        /// <summary>Nome completo ou apelido da pessoa.</summary>
        public string? name { get; set; }

        /// <summary>Idade utilizada em regras de negócio (ex.: restrição de receita para menores).</summary>
        public int age { get; set; }
    }
}
