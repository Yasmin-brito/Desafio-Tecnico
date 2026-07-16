import { UiButton } from '@/components/Ui/buttom/UiButton'
import type { ReportRow } from '../services/reportService'
import { exportReportPdf } from '../utils/exportReportPdf'

interface ExportButtonsProps {
  periodLabel: string
  totalIncome: number
  totalExpense: number
  totalBalance: number
  rows: ReportRow[]
}

/**
 * Botões de exportação do relatório de consulta.
 * Delega a geração do arquivo para `exportReportPdf`.
 */
export function ExportButtons({ periodLabel, totalIncome, totalExpense, totalBalance, rows }: ExportButtonsProps) {
  /** Dispara o download do PDF com os dados já carregados na tela. */
  const handleExport = () => {
    exportReportPdf({
      periodLabel,
      totalIncome,
      totalExpense,
      totalBalance,
      rows,
    })
  }

  return (
    <div className="flex gap-1">
      <UiButton onClick={handleExport}>Exportar PDF</UiButton>
    </div>
  )
}
