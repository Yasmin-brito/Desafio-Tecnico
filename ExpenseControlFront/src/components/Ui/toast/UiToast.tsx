import type { Toast } from '@/hooks/useToast'
import { UiIcon } from '../Icon/UiIcon'
import cross from '@/assets/icons/cross'

interface ToastProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

export function UiToast({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${
            toast.type === 'success'
              ? 'bg-emerald-500 text-white'
              : toast.type === 'error'
                ? 'bg-rose-500 text-white'
                : 'bg-slate-700 text-white'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <span>{toast.message}</span>
            <button
              type="button"
              onClick={() => onRemove(toast.id)}
              className="text-current hover:opacity-75"
            >
              <UiIcon data={cross} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
