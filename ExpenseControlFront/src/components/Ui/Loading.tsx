export function Loading({ message = 'Carregando...' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-10 text-sm text-slate-600">
      <span className="animate-pulse">{message}</span>
    </div>
  )
}
