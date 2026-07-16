import { UiTable } from '@/components/Ui/table/UiTable'
import type { Transaction } from '@/types';

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR')
}

export function TransactionTable({ transactions }: {transactions: Transaction[]}) {
  const rows = transactions.map((t) => [
    t.description,
    `R$ ${t.value.toFixed(2)}`,
    t.type === 0 ? 'Receita' : 'Despesa',
    t.userName,
    formatDate(t.createdAt),
  ])

  return <UiTable headers={['Descrição', 'Valor', 'Tipo', 'Pessoa', 'Data']} rows={rows} emptyMessage="Nenhuma transação cadastrada." />
}
