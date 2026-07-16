import chevronR from "@/assets/icons/chevronR"
import chevronL from "@/assets/icons/chevronL"
import { UiIcon } from "@/components/Ui/Icon/UiIcon"
interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex items-center justify-end gap-2 mt-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        className="rounded-lg border border-slate-200 px-1 py-1 text-xs text-slate-600"
      >
        <UiIcon data={chevronL}/>
      </button>
      <span className="text-sm text-slate-600">Página {page} de {totalPages}</span>
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        className="rounded-lg border border-slate-200 px-1 py-1 text-xs text-slate-600"
      >
        <UiIcon data={chevronR}/>
      </button>
    </div>
  )
}
