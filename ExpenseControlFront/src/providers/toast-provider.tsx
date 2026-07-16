import { createContext, useContext, type ReactNode } from 'react'
import { useToast } from '@/hooks/useToast'
import { UiToast } from '@/components/Ui/toast/UiToast'

interface ToastContextType {
  show: (message: string, type?: 'success' | 'error' | 'info') => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const toast = useToast()

  return (
    <ToastContext.Provider value={{ show: toast.show }}>
      {children}
      <UiToast toasts={toast.toasts} onRemove={toast.remove} />
    </ToastContext.Provider>
  )
}

export function useToastContext() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToastContext deve ser usado dentro de um ToastProvider')
  }
  return context
}
