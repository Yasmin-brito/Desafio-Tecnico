import { api } from '@/lib/axios'
import type { Transaction, PagedResult } from '@/types'

/**
 * Camada de acesso à API de transações financeiras.
 * Encapsula as chamadas HTTP ao endpoint `/api/Transaction` do backend.
 */
export const transactionService = {
  /**
   * Busca transações paginadas, da mais recente para a mais antiga.
   * Corresponde a `GET /api/Transaction/{pageNumber}/{pageSize}`.
   */
  async getPaged(pageNumber = 1, pageSize = 10): Promise<PagedResult<Transaction>> {
    const response = await api.get(`/Transaction/${pageNumber}/${pageSize}`)
    return response.data
  },

  /**
   * Registra uma nova transação (receita ou despesa) vinculada a um usuário.
   * Corresponde a `POST /api/Transaction`.
   */
  async create(data: {
    description: string
    value: number
    type: 0 | 1
    userId: string
  }): Promise<Transaction> {
    const response = await api.post('/Transaction', data)
    return response.data
  },
}
