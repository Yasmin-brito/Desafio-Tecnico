import { api } from '@/lib/axios'
import type { User, PagedResult } from '@/types'

/**
 * Camada de acesso à API de usuários.
 * Encapsula as chamadas HTTP ao endpoint `/api/User` do backend.
 */
export const userService = {
  /**
   * Busca usuários paginados no backend.
   * Corresponde a `GET /api/User/{pageNumber}/{pageSize}`.
   */
  async getPaged(pageNumber = 1, pageSize = 10): Promise<PagedResult<User>> {
    const response = await api.get(`/User/${pageNumber}/${pageSize}`)
    return response.data
  },

  /**
   * Cadastra um novo usuário no backend.
   * Corresponde a `POST /api/User`.
   */
  async create(data: { name: string; age: number }): Promise<User> {
    const response = await api.post('/User', data)
    return response.data
  },

  /**
   * Remove um usuário pelo identificador.
   * Corresponde a `DELETE /api/User/{id}`.
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/User/${id}`)
  },
}
