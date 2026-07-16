import type { ReportRow } from "../services/reportService"

interface TotalsTableProps {
  rows: ReportRow[]
}

const formatoReal = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function TotalsTable({ rows }: TotalsTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">Pessoa</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">Receitas</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">Despesas</th>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">Saldo</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row) => (
            <tr key={row.userId}>
              <td className="px-4 py-3 text-slate-700">{row.name}</td>
              <td className="px-4 py-3 text-slate-700">{formatoReal.format(row.incomeSum)}</td>
              <td className="px-4 py-3 text-slate-700">{formatoReal.format(row.expenseSum)}</td>
              <td className="px-4 py-3 text-slate-700">{formatoReal.format(row.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
