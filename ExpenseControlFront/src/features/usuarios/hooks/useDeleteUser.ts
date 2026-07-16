import { useCallback, useState } from 'react'
import { userService } from '../services/userService'

interface UseDeleteUserState {
  loading: boolean
  error: string | null
  success: boolean
}

/**
 * Hook para exclusão de usuários.
 * Propaga sucesso/falha para a página decidir entre toast, refetch ou manter o diálogo aberto.
 */
export function useDeleteUser() {
  const [state, setState] = useState<UseDeleteUserState>({
    loading: false,
    error: null,
    success: false,
  })

  /**
   * Remove um usuário pelo identificador.
   * Retorna `true` quando a API confirma a exclusão.
   */
  const deleteUser = useCallback(async (id: string): Promise<boolean> => {
    setState({ loading: true, error: null, success: false })
    try {
      await userService.delete(id)
      setState({ loading: false, error: null, success: true })
      return true
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro ao excluir pessoa'
      setState({ loading: false, error: message, success: false })
      return false
    }
  }, [])

  return { ...state, deleteUser }
}
