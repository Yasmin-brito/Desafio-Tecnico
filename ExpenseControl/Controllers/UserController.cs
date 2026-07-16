using ExpenseControl.DTOs.User;
using ExpenseControl.Models.PagedResult;
using ExpenseControl.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Controllers
{
    /// <summary>
    /// Expõe endpoints REST para gerenciamento de pessoas do domínio.
    /// Centraliza o cadastro, consulta paginada e exclusão de usuários sem acoplar a lógica ao banco de dados.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        /// <summary>
        /// Inicializa o controller com o serviço de usuários injetado pelo container de DI.
        /// </summary>
        /// <param name="userService">Serviço responsável pelas operações de usuário.</param>
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Cadastra uma nova pessoa no sistema.
        /// </summary>
        /// <param name="userDto">Dados de criação enviados no corpo da requisição.</param>
        /// <returns>Usuário criado com o identificador gerado pelo banco.</returns>
        [HttpPost]
        public async Task<ActionResult<UserResponseDto>> createUser(CreateUserDto userDto)
        {
            var user = await _userService.createUser(userDto);

            return Created(string.Empty, user);
        }

        /// <summary>
        /// Lista usuários de forma paginada, ordenados alfabeticamente por nome.
        /// </summary>
        /// <param name="pageNumber">Número da página (base 1).</param>
        /// <param name="pageSize">Quantidade de registros por página.</param>
        /// <returns>Conjunto paginado de usuários com metadados de navegação.</returns>
        [HttpGet("{pageNumber:int}/{pageSize:int}")]
        public async Task<ActionResult<PagedResult<UserResponseDto>>> list(int pageNumber = 1, int pageSize = 2)
        {
            var users = await _userService.listUsers(pageNumber, pageSize);

            return Ok(users);
        }

        /// <summary>
        /// Remove um usuário e, em cascata, todas as suas transações associadas.
        /// </summary>
        /// <param name="id">Identificador único do usuário a ser excluído.</param>
        /// <returns>
        /// <see cref="NoContentResult"/> quando a exclusão é bem-sucedida;
        /// <see cref="NotFoundResult"/> quando o usuário não existe.
        /// </returns>
        [HttpDelete("{id:Guid}")]
        public async Task<ActionResult> delete(Guid id)
        {
            var delete = await _userService.deleteUser(id);

            if (!delete)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
