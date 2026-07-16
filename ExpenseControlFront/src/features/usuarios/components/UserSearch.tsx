import { UiInput } from '@/components/Ui/input/UiInput'

interface UserSearchProps {
  value: string
  onChange: (value: string) => void
}

export function UserSearch({ value, onChange }: UserSearchProps) {
  return <UiInput label="Buscar pessoa" placeholder="Digite o nome" value={value} onChange={(event) => onChange(event.target.value)} />
}
