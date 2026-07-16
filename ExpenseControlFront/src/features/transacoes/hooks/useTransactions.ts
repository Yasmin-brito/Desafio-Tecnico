import { useCallback, useEffect, useState } from 'react'
import { transactionService } from '../services/transactionService'
import type { Transaction } from '@/types'

/**
 * Hook de listagem paginada de transações.
 * Mantém sincronizado o estado da tabela com a paginação retornada pela API.
 */
export function useTransactions(pageSize = 10) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  /** Busca uma página de transações no backend e atualiza o estado local. */
  const fetchTransactions = useCallback(async (pageNumber = page) => {
    setLoading(true)
    setError(null)
    try {
      const data = await transactionService.getPaged(pageNumber, pageSize)
      setTransactions(data.datas)
      setPage(data.pageNumber)
      setTotalPages(data.totalPages)
      setLoading(false)
      setError(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar transações')
      setTransactions([])
      setLoading(false)
    }
  }, [page, pageSize])

  useEffect(() => {
    fetchTransactions(page)
  }, [page, fetchTransactions])

  return { transactions, page, totalPages, loading, error, setPage, refetch: () => fetchTransactions(page) }
}
