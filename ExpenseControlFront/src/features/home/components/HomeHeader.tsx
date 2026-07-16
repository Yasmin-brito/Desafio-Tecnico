interface HomeHeaderProps {
  name: string
}

export function HomeHeader({ name }: HomeHeaderProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-600 p-6 text-white">
      <p className="text-sm text-slate-300">Olá, {name}</p>
      <h2 className="mt-2 text-2xl font-semibold">O que temos para hoje?</h2>
    </div>
  )
}
