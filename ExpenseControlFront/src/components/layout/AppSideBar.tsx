import { NavLink } from 'react-router-dom'
import { UiIcon } from '../Ui/Icon/UiIcon'
import house from '@/assets/icons/house'
import user from '@/assets/icons/user'
import calendar from '@/assets/icons/calendar'
import chart from '@/assets/icons/chart'
import cross from '@/assets/icons/cross'

const items = [
  { to: '/', label: 'Home', icon: house },
  { to: '/pessoas', label: 'Cadastro de Pessoas', icon: user },
  { to: '/transacoes', label: 'Cadastro de Transações', icon: calendar },
  { to: '/consultas-totais', label: 'Consulta de Totais', icon: chart },
]

type AppSideBarProps = {
  open: boolean
  onClose: () => void
}

function SideBarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <div className="mb-6 rounded-2xl bg-slate-600 p-4 text-white">
        <p className="text-sm font-medium text-slate-300">Painel</p>
        <p className="mt-1 text-lg font-semibold">Controle Financeiro</p>
      </div>

      <nav className="space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive ? 'bg-slate-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`
            }
          >
            <UiIcon data={item.icon} className="h-5 w-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export function AppSideBar({ open, onClose }: AppSideBarProps) {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-72 shrink-0 flex-col border-r border-slate-200 bg-white p-4 lg:flex">
        <SideBarContent />
      </aside>

      {/* Mobile */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 transition-opacity lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-white p-4 shadow-xl transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!open}
      >
        <div className="mb-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
            aria-label="Fechar menu"
          >
            <UiIcon data={cross} className="h-5 w-5" />
          </button>
        </div>
        <SideBarContent onNavigate={onClose} />
      </aside>
    </>
  )
}
