namespace ExpenseControl.Models.PagedResult
{
    /// <summary>
    /// Envelope genérico para respostas paginadas da API.
    /// Padroniza metadados de navegação e evita repetir a mesma estrutura em cada endpoint de listagem.
    /// </summary>
    /// <typeparam name="T">Tipo dos itens retornados na página atual.</typeparam>
    public class PagedResult<T>
    {
        /// <summary>
        /// Monta o resultado paginado com os dados da página e o total de registros no banco.
        /// </summary>
        /// <param name="datas">Itens da página solicitada.</param>
        /// <param name="totalRecords">Quantidade total de registros, independente da paginação.</param>
        /// <param name="pageNumber">Página atual (base 1).</param>
        /// <param name="pageSize">Tamanho da página.</param>
        public PagedResult(List<T> datas, int totalRecords, int pageNumber, int pageSize)
        {
            Datas = datas;
            TotalRecords = totalRecords;
            PageNumber = pageNumber;
            PageSize = pageSize;
        }

        /// <summary>Itens pertencentes à página atual.</summary>
        public List<T> Datas { get; set; }

        /// <summary>Total de registros disponíveis em todas as páginas.</summary>
        public int TotalRecords { get; set; }

        /// <summary>Número da página retornada.</summary>
        public int PageNumber { get; set; }

        /// <summary>Quantidade máxima de itens por página.</summary>
        public int PageSize { get; set; }

        /// <summary>Quantidade total de páginas calculada a partir de <see cref="TotalRecords"/> e <see cref="PageSize"/>.</summary>
        public int TotalPages => (int)Math.Ceiling((double)TotalRecords / PageSize);

        /// <summary>Indica se existe uma página anterior à atual.</summary>
        public bool HasPreviousPage => PageNumber > 1;

        /// <summary>Indica se existe uma próxima página após a atual.</summary>
        public bool HasNextPage => PageNumber < TotalPages;
    }
}
