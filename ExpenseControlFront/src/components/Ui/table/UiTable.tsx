import type { ReactNode } from 'react'

interface TableProps {
  headers: string[]
  rows: ReactNode[]
  emptyMessage?: string
}

export function UiTable({ headers, rows, emptyMessage = 'Nenhum registro encontrado.' }: TableProps) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-600">
        {emptyMessage}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 text-left font-semibold text-slate-700">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((row, index) => (
            <tr key={index} className="align-top">
              {Array.isArray(row) ? row.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-3 text-slate-600">{cell}</td>) : <td className="px-4 py-3 text-slate-600">{row}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
