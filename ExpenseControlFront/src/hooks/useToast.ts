import { useCallback, useState } from 'react'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const show = useCallback((message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 11)
    const toast: Toast = { id, message, type }

    setToasts((current) => [...current, toast])

    setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id))
    }, 5000)

    return id
  }, [])

  const remove = useCallback((id: string) => {
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  return { toasts, show, remove }
}
