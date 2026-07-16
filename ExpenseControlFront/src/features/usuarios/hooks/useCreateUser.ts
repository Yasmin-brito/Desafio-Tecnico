import { useCallback, useState } from 'react'
import { userService } from '../services/userService'
import type { User } from '@/types'

interface UseCreateUserState {
  loading: boolean
  error: string | null
  success: boolean
}

/**
 * Hook para cadastro de usuários.
 * Encapsula o ciclo de requisição (loading/erro/sucesso) após validação na página.
 */
export function useCreateUser() {
  const [state, setState] = useState<UseCreateUserState>({
    loading: false,
    error: null,
    success: false,
  })

  /**
   * Envia os dados validados para criação no backend.
   * Retorna o usuário criado ou `null` em caso de falha.
   */
  const create = useCallback(async (data: { name: string; age: number }): Promise<User | null> => {
    setState({ loading: true, error: null, success: false })
    try {
      const result = await userService.create(data)
      setState({ loading: false, error: null, success: true })
      return result
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao criar pessoa'
      setState({ loading: false, error: message, success: false })
      return null
    }
  }, [])

  return { ...state, create }
}
