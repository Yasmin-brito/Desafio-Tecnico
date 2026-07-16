import { UiModal } from '../modal/UiModal'
import { UiButton } from '../buttom/UiButton'

interface ConfirmDialogProps {
  open: boolean
  title: string
  description: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
}

export function UiDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <UiModal open={open} title={title} description={description} onClose={onCancel}>
      <div className="flex justify-end gap-3">
        <UiButton variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </UiButton>
        <UiButton variant="danger" onClick={onConfirm}>
          {confirmLabel}
        </UiButton>
      </div>
    </UiModal>
  )
}
