import { useCallback, useState } from 'react'
import { transactionService } from '../services/transactionService'
import type { Transaction } from '@/types'

interface UseCreateTransactionState {
  loading: boolean
  error: string | null
  success: boolean
}

/**
 * Hook para criação de transações financeiras.
 * A validação de regras (campos obrigatórios, bloqueio de receita) ocorre na página antes da chamada.
 */
export function useCreateTransaction() {
  const [state, setState] = useState<UseCreateTransactionState>({
    loading: false,
    error: null,
    success: false,
  })

  /**
   * Persiste uma transação no backend.
   * Retorna a transação criada ou `null` quando a API rejeita a operação.
   */
  const create = useCallback(
    async (data: { userId: string; description: string; value: number; type: 0 | 1 }): Promise<Transaction | null> => {
      setState({ loading: true, error: null, success: false })
      try {
        const result = await transactionService.create(data)
        setState({ loading: false, error: null, success: true })
        return result
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro ao criar transação'
        setState({ loading: false, error: message, success: false })
        return null
      }
    },
    [],
  )

  return { ...state, create }
}
