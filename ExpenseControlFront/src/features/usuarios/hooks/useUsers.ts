import { useCallback, useEffect, useState } from 'react'
import { userService } from '../services/userService'
import type { User } from '@/types'

/**
 * Hook de listagem paginada de usuários.
 * Gerencia estado de carregamento, erro e navegação entre páginas da API.
 */
export function useUsers(pageSize = 10) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  /** Busca uma página de usuários no backend e atualiza o estado local. */
  const fetchUsers = useCallback(async (pageNumber = page) => {
    setLoading(true)
    setError(null)
    try {
      const data = await userService.getPaged(pageNumber, pageSize)
      setUsers(data.datas)
      setPage(data.pageNumber)
      setTotalPages(data.totalPages)
      setLoading(false)
      setError(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar pessoas')
      setUsers([])
      setLoading(false)
    }
  }, [page, pageSize])

  useEffect(() => {
    fetchUsers()
  }, [page, fetchUsers])

  return { users, loading, error, page, totalPages, setPage, refetch: () => fetchUsers(page) }
}
