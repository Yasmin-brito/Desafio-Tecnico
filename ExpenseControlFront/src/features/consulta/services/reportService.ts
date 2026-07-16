import { api } from '@/lib/axios'

/** Linha do relatório com totais financeiros de um usuário. */
export interface ReportRow {
  userId: string
  name: string
  incomeSum: number
  expenseSum: number
  balance: number
}

/** Resposta consolidada do relatório de saldo. */
export interface ReportResponse {
  rows: ReportRow[]
  totalIncome: number
  totalExpense: number
  totalBalance: number
}

/**
 * Converte o filtro de período da interface em datas para query string da API.
 * Não faz requisição HTTP; prepara os parâmetros usados por `getBalance`.
 *
 * @param range - Preset em dias (`'30'`, `'60'`, `'90'`) ou `'custom'` para intervalo manual.
 * @param customStart - Data inicial no formato `YYYY-MM-DD`, obrigatória quando `range` é `'custom'`.
 * @param customEnd - Data final no formato `YYYY-MM-DD`, obrigatória quando `range` é `'custom'`.
 * @returns Objeto com `startDate` e `endDate` prontos para a query da API.
 */
export function getDateRange(range: string, customStart?: string, customEnd?: string) {
  const end = new Date()
  const start = new Date()

  if (range === 'custom' && customStart && customEnd) {
    return { startDate: customStart, endDate: customEnd }
  }

  const days = Number(range) || 30
  start.setDate(end.getDate() - days)

  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
  }
}

/**
 * Camada de acesso à API de relatórios financeiros.
 * Encapsula as chamadas HTTP ao endpoint `/api/Report` do backend.
 */
export const reportService = {
  /**
   * Consulta receitas, despesas e saldo por usuário no período informado.
   * Corresponde a `GET /api/Report?startDate=&endDate=`.
   */
  async getBalance(params?: { startDate?: string; endDate?: string }): Promise<ReportResponse> {
    const response = await api.get('/Report', { params })
    return response.data
  },
}
