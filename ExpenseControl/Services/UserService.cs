using ExpenseControl.Data;
using ExpenseControl.DTOs.User;
using ExpenseControl.Models;
using ExpenseControl.Models.PagedResult;
using ExpenseControl.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ExpenseControl.Services
{
    /// <summary>
    /// Implementa o ciclo de vida de usuários: cadastro, listagem paginada e exclusão.
    /// A exclusão em cascata das transações é garantida pela configuração do EF Core em <see cref="Data.Configurations.UserConfig"/>.
    /// </summary>
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        /// <summary>
        /// Injeta o contexto de dados para operações de persistência de usuários.
        /// </summary>
        /// <param name="context">Sessão do Entity Framework com o banco PostgreSQL.</param>
        public UserService(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Persiste um novo usuário e retorna o registro já com o identificador gerado.
        /// </summary>
        /// <param name="dto">Dados de cadastro enviados pela API.</param>
        /// <returns>Usuário mapeado para o DTO de resposta.</returns>
        public async Task<UserResponseDto> createUser(CreateUserDto dto)
        {
            var user = new User
            {
                name = dto.name,
                age = dto.age
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            return toDto(user);
        }

        /// <summary>
        /// Retorna usuários ordenados alfabeticamente por nome, com suporte a paginação.
        /// </summary>
        /// <param name="pageNumber">Número da página (base 1).</param>
        /// <param name="pageSize">Quantidade de itens por página.</param>
        /// <returns>Resultado paginado com DTOs de usuário.</returns>
        public async Task<PagedResult<UserResponseDto>> listUsers(int pageNumber, int pageSize)
        {
            var users = await _context.Users
                .AsNoTracking()
                .OrderBy(u => u.name)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var totalRecords = await _context.Users.CountAsync();

            return new PagedResult<UserResponseDto>(users.Select(toDto).ToList(), totalRecords, pageNumber, pageSize);
        }

        /// <summary>
        /// Remove um usuário pelo identificador.
        /// Retorna <c>false</c> sem lançar exceção quando o registro não existe, permitindo ao controller responder 404.
        /// </summary>
        /// <param name="id">Identificador do usuário a excluir.</param>
        /// <returns><c>true</c> se excluído com sucesso; <c>false</c> se não encontrado.</returns>
        public async Task<bool> deleteUser(Guid id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user is null) return false;

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return true;
        }

        /// <summary>
        /// Converte a entidade <see cref="User"/> para o contrato de resposta da API.
        /// </summary>
        /// <param name="u">Entidade de usuário persistida.</param>
        /// <returns>DTO com os campos públicos do usuário.</returns>
        private static UserResponseDto toDto(User u)
        {
            return new UserResponseDto
            {
                id = u.id,
                name = u.name,
                age = u.age
            };
        }
    }
}
