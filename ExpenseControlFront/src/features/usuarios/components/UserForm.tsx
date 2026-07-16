import { UiButton } from '@/components/Ui/buttom/UiButton'
import { UiInput } from '@/components/Ui/input/UiInput'

interface UserFormProps {
  values: { name: string; age: number }
  errors?: { name?: string; age?: string }
  onChange: (field: 'name' | 'age', value: string | number) => void
  onClose: () => void
  onSubmit: () => void
}

export function UserForm({ values, errors, onChange, onClose, onSubmit }: UserFormProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900">Nova pessoa</h3>
        <UiButton variant="ghost" size="sm" onClick={onClose}>
          Fechar
        </UiButton>
      </div>
      <UiInput
        label="Nome"
        placeholder="Ex.: Maria"
        value={values.name}
        error={errors?.name}
        onChange={(event) => onChange('name', event.target.value)}
      />
      <UiInput
        label="Idade"
        type="number"
        min="0"
        placeholder="Ex.: 20"
        value={values.age === 0 ? '' : values.age}
        error={errors?.age}
        onChange={(event) => onChange('age', event.target.value)}
      />
      <div className="flex justify-end">
        <UiButton onClick={onSubmit}>
          Salvar
        </UiButton>
      </div>
    </div>
  )
}
