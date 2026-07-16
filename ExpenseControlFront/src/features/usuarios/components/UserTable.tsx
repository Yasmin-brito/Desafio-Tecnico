import { UiButton } from '@/components/Ui/buttom/UiButton'
import { UiTable } from '@/components/Ui/table/UiTable'
import type { User } from '@/types'

interface UserTableProps {
  users: Array<User>
  onDelete: (id: string) => void
}

export function UserTable({ users, onDelete }: UserTableProps) {
  const rows = users.map((user) => [
    user.name,
    user.age,
    <UiButton key={user.id} variant="danger" size="sm" onClick={() => onDelete(user.id)}>
      Excluir
    </UiButton>,
  ])

  return <UiTable headers={['Nome', 'Idade', 'Ação']} rows={rows} emptyMessage="Nenhuma pessoa cadastrada." />
}
