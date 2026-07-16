using ExpenseControl.DTOs.User;
using ExpenseControl.Models.PagedResult;

namespace ExpenseControl.Services.Interfaces
{
    /// <summary>
    /// Contrato da camada de aplicação para operações de usuários.
    /// Define o comportamento esperado independentemente da persistência em PostgreSQL.
    /// </summary>
    public interface IUserService
    {
        /// <summary>Cadastra uma nova pessoa no sistema.</summary>
        /// <param name="dto">Dados de criação do usuário.</param>
        /// <returns>Usuário persistido com identificador gerado.</returns>
        Task<UserResponseDto> createUser(CreateUserDto dto);

        /// <summary>Lista usuários de forma paginada, ordenados por nome.</summary>
        /// <param name="pageNumber">Número da página (base 1).</param>
        /// <param name="pageSize">Quantidade de itens por página.</param>
        /// <returns>Resultado paginado com metadados de navegação.</returns>
        Task<PagedResult<UserResponseDto>> listUsers(int pageNumber, int pageSize);

        /// <summary>
        /// Remove um usuário existente.
        /// </summary>
        /// <param name="id">Identificador do usuário.</param>
        /// <returns><c>true</c> se o usuário foi encontrado e excluído; <c>false</c> caso contrário.</returns>
        Task<bool> deleteUser(Guid id);
    }
}
