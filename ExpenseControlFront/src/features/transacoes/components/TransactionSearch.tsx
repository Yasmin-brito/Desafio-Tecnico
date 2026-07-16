import { UiInput } from '@/components/Ui/input/UiInput'

interface TransactionSearchProps {
  value: string
  onChange: (value: string) => void
}

export function TransactionSearch({ value, onChange }: TransactionSearchProps) {
  return <UiInput label="Buscar transação" placeholder="Digite descrição ou pessoa" value={value} onChange={(event) => onChange(event.target.value)} />
}
