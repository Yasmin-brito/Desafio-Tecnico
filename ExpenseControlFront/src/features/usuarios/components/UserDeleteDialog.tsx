import { UiDialog } from '@/components/Ui/dialog/UiDialog'

interface UserDeleteDialogProps {
  open: boolean
  name: string
  onCancel: () => void
  onConfirm: () => void
}

export function UserDeleteDialog({ open, name, onCancel, onConfirm }: UserDeleteDialogProps) {
  return (
    <UiDialog
      open={open}
      title={`Excluir ${name}`}
      description={`Isso removerá ${name} e todas as transações relacionadas.`}
      confirmLabel="Excluir"
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  )
}
