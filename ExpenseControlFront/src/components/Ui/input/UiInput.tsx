import type { InputHTMLAttributes } from 'react'

interface UiInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function UiInput({ label, error, className = '', ...props }: UiInputProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm font-medium text-slate-700">
      {label ? <span>{label}</span> : null}
      <input
        className={`rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100 ${error ? 'border-rose-400' : ''} ${className}`.trim()}
        {...props}
      />
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}
    </label>
  )
}
