using ExpenseControl.DTOs.Report;
using ExpenseControl.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Controllers
{
    /// <summary>
    /// Expõe endpoints de consulta de relatórios financeiros.
    /// Mantém a camada HTTP fina: apenas recebe parâmetros, delega ao serviço e retorna o resultado.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        /// <summary>
        /// Inicializa o controller com o serviço responsável pela geração de relatórios.
        /// </summary>
        /// <param name="reportService">Serviço injetado para consulta de saldos e totais.</param>
        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        /// <summary>
        /// Retorna o relatório de receitas, despesas e saldo por usuário no período informado.
        /// </summary>
        /// <param name="startDate">Data inicial do filtro (opcional). Se omitida, considera os últimos 30 dias até <paramref name="endDate"/>.</param>
        /// <param name="endDate">Data final do filtro (opcional). Se omitida, usa a data atual em UTC.</param>
        /// <returns>
        /// Relatório com o detalhamento por pessoa e os totais gerais de receita, despesa e saldo.
        /// </returns>
        [HttpGet]
        public async Task<ActionResult<ReportBalanceResponseDto>> getBalance([FromQuery]DateTime? startDate, [FromQuery]DateTime? endDate)
        {
            var result = await _reportService.getBalance(startDate, endDate);

            return Ok(result);
        }
    }
}