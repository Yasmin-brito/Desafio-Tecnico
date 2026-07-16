interface MonthFilterProps {
  value: string
  onChange: (value: string) => void
  customStart: string
  customEnd: string
  onCustomStartChange: (value: string) => void
  onCustomEndChange: (value: string) => void
}

/** Rótulos exibidos para cada preset de período disponível no relatório. */
const labels: Record<string, string> = {
  '30': '30 dias',
  '60': '60 dias',
  '90': '90 dias',
  custom: 'Personalizado',
}

/**
 * Seletor de período para o relatório de totais.
 * Emite o preset escolhido para a página converter em datas via `getDateRange`.
 */
export function MonthFilter({
  value,
  onChange,
  customStart,
  customEnd,
  onCustomStartChange,
  onCustomEndChange,
}: MonthFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {['30', '60', '90', 'custom'].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-full px-3 py-2 text-sm font-medium ${value === option ? 'bg-slate-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            {labels[option]}
          </button>
        ))}
      </div>

      {value === 'custom' && (
        <div className="flex flex-wrap gap-2">
          <input
            type="date"
            value={customStart}
            onChange={(e) => onCustomStartChange(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            type="date"
            value={customEnd}
            onChange={(e) => onCustomEndChange(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
        </div>
      )}
    </div>
  )
}
