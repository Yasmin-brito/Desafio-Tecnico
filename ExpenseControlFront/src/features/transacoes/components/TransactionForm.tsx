import { UiButton } from '@/components/Ui/buttom/UiButton'
import { UiInput } from '@/components/Ui/input/UiInput'
import { UiSelect } from '@/components/Ui/select/UiSelect'
import type { User } from '@/types'

/**
 * Converte um número para exibição monetária em Real (BRL).
 * Retorna string vazia quando o valor é zero, para não poluir o campo durante a digitação.
 */
function formatCurrency(value: number): string {
  if (!value) {
    return ''
  }

  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

/**
 * Interpreta o texto digitado no campo de valor e converte para número decimal.
 * Remove caracteres não numéricos e trata os dois últimos dígitos como centavos.
 */
function parseCurrency(input: string): number {
  const digits = input.replace(/\D/g, '')
  if (!digits) {
    return 0
  }

  return Number(digits) / 100
}

interface TransactionFormProps {
  values: { userId: string; description: string; value: number; type: number }
  users: Array<User>
  isReceitaBlocked: boolean
  onChange: (field: 'userId' | 'description' | 'value' | 'type', value: string) => void
  onClose: () => void
  onSubmit: () => void
}

/**
 * Formulário de criação de transação com máscara monetária e aviso de bloqueio de receita.
 * A regra de menor de 18 anos é aplicada na página via prop `isReceitaBlocked`.
 */
export function TransactionForm({ values, users, isReceitaBlocked, onChange, onClose, onSubmit }: TransactionFormProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900">Nova transação</h3>
        <UiButton variant="ghost" size="sm" onClick={onClose}>
          Fechar
        </UiButton>
      </div>
      <UiSelect
        label="Pessoa"
        value={values.userId}
        onChange={(event) => onChange('userId', event.target.value)}
        options={[{ label: 'Selecione uma pessoa', value: '' }, ...users.map((user) => ({ label: user.name, value: user.id }))]}
      />
      <UiInput label="Descrição" value={values.description} onChange={(event) => onChange('description', event.target.value)} />
      <UiInput
        label="Valor"
        inputMode="numeric"
        placeholder="R$ 0,00"
        value={formatCurrency(values.value)}
        onChange={(event) => onChange('value', String(parseCurrency(event.target.value)))}
      />
      <UiSelect
        label="Tipo"
        value={values.type}
        onChange={(event) => onChange('type', event.target.value)}
        options={[
          { label: 'Receita', value: '0' },
          { label: 'Despesa', value: '1' },
        ]}
      />
      {isReceitaBlocked ? <p className="text-sm text-amber-600">Receita bloqueada para pessoas menores de 18 anos.</p> : null}
      <div className="flex justify-end">
        <UiButton onClick={onSubmit}>
          Salvar
        </UiButton>
      </div>
    </div>
  )
}
