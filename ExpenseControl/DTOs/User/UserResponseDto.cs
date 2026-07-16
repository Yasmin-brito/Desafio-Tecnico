namespace ExpenseControl.DTOs.User
{
    /// <summary>
    /// Contrato de saída com os dados públicos de um usuário.
    /// Omite coleções e metadados internos para manter respostas leves e seguras.
    /// </summary>
    public class UserResponseDto
    {
        /// <summary>Identificador único do usuário.</summary>
        public Guid id { get; set; }

        /// <summary>Nome da pessoa cadastrada.</summary>
        public string? name { get; set; }

        /// <summary>Idade registrada no cadastro.</summary>
        public int age { get; set; }
    }
}
