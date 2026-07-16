import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { ReportRow } from '../services/reportService'

/**
 * Formata valores monetários no padrão brasileiro (BRL).
 * Usado na geração do PDF para manter consistência visual com a interface.
 */
function formatMoney(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

interface ExportReportPdfParams {
  periodLabel: string
  totalIncome: number
  totalExpense: number
  totalBalance: number
  rows: ReportRow[]
}

/**
 * Gera e baixa um PDF com os totais gerais e o detalhamento por pessoa.
 * Centraliza a exportação fora dos componentes para facilitar manutenção do layout do relatório.
 */
export function exportReportPdf({
  periodLabel,
  totalIncome,
  totalExpense,
  totalBalance,
  rows,
}: ExportReportPdfParams) {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text('Consulta de Totais', 14, 20)

  doc.setFontSize(11)
  doc.text(`Período: ${periodLabel}`, 14, 28)

  doc.setFontSize(13)
  doc.text('Totais gerais', 14, 38)

  doc.setFontSize(11)
  doc.text(`Total geral receitas: ${formatMoney(totalIncome)}`, 14, 46)
  doc.text(`Total geral despesas: ${formatMoney(totalExpense)}`, 14, 52)
  doc.text(`Saldo geral: ${formatMoney(totalBalance)}`, 14, 58)

  doc.setFontSize(13)
  doc.text('Totais por pessoa', 14, 70)

  autoTable(doc, {
    startY: 76,
    head: [['Pessoa', 'Receitas', 'Despesas', 'Saldo']],
    body: rows.map((row) => [
      row.name,
      formatMoney(row.incomeSum),
      formatMoney(row.expenseSum),
      formatMoney(row.balance),
    ]),
  })

  const fileName = `relatorio-totais-${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}
