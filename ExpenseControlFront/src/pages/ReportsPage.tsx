import { useMemo, useState } from 'react'
import { UiCard } from '@/components/Ui/card/UiCard'
import { AppPageContainer } from '@/components/layout/AppPageContainer'
import { Loading } from '@/components/Ui/Loading'
import { EmptyState } from '@/components/Ui/EmptyState'
import { UiButton } from '@/components/Ui/buttom/UiButton'
import { ExportButtons } from '@/features/consulta/components/ExportButtons'
import { MonthFilter } from '@/features/consulta/components/MonthFilter'
import { Pagination } from '@/features/consulta/components/Pagination'
import { TotalsTable } from '@/features/consulta/components/TotalsTable'
import { useReport } from '@/features/consulta/hooks/useReport'
import { getDateRange } from '@/features/consulta/services/reportService'

/**
 * Página de consulta de totais financeiros.
 * Possui filtro de período, busca na API e exibição/exportação do relatório.
 */
export function ReportsPage() {
  const [range, setRange] = useState('30')
  const [customStart, setCustomStart] = useState('')
  const [customEnd, setCustomEnd] = useState('')
  const [page, setPage] = useState(1)

  /** Traduz o filtro visual em parâmetros de data consumidos pelo hook `useReport`. */
  const dateParams = useMemo(() => getDateRange(range, customStart, customEnd), [range, customStart, customEnd])

  const { report, loading, error, refetch } = useReport(dateParams)

  /** Normaliza os totais da API para exibição nos cards, evitando `undefined` na interface. */
  const summary = useMemo(() => {
    if (!report) {
      return { receitas: 0, despesas: 0, saldo: 0 }
    }

    return {
      receitas: Number(report.totalIncome ?? 0),
      despesas: Number(report.totalExpense ?? 0),
      saldo: Number(report.totalBalance ?? 0),
    }
  }, [report])

  /** Formata o valor em real. */
  const formatoReal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  /** Monta o rótulo do período exibido na tela e no PDF exportado. */
  const periodLabel = useMemo(() => {
    if (range === 'custom' && customStart && customEnd) {
      return `${customStart} a ${customEnd}`
    }

    return `${dateParams.startDate} a ${dateParams.endDate}`
  }, [range, customStart, customEnd, dateParams])

  if (loading) {
    return (
      <AppPageContainer>
        <Loading message="Carregando relatório..." />
      </AppPageContainer>
    )
  }

  if (error) {
    return (
      <AppPageContainer>
        <EmptyState
          title="Erro ao carregar relatório"
          description={error}
          action={<UiButton onClick={() => refetch()}>Tentar novamente</UiButton>}
        />
      </AppPageContainer>
    )
  }

  return (
    <AppPageContainer>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Consulta de Totais</h2>
            <p className="text-sm text-slate-600">Analise os totais por pessoa com filtros por período e valores somados.</p>
          </div>
          <ExportButtons
            periodLabel={periodLabel}
            totalIncome={summary.receitas}
            totalExpense={summary.despesas}
            totalBalance={summary.saldo}
            rows={report?.rows ?? []}
          />
        </div>

        <UiCard title="Filtros" description="Aplique o período desejado para a análise.">
          <MonthFilter
            value={range}
            onChange={setRange}
            customStart={customStart}
            customEnd={customEnd}
            onCustomStartChange={setCustomStart}
            onCustomEndChange={setCustomEnd}
          />
        </UiCard>

        <UiCard title="Totais gerais" description="Valores somados para o período selecionado.">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Total geral receitas</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{formatoReal.format(summary.receitas)}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Total geral despesas</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{formatoReal.format(summary.despesas)}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm text-slate-600">Saldo geral</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">{formatoReal.format(summary.saldo)}</p>
            </div>
          </div>
        </UiCard>

        <UiCard title="Totais por pessoa">
          {report?.rows && report.rows.length > 0 ? (
            <>
              <TotalsTable rows={report.rows} />
              <div className="mt-4">
                <Pagination page={page} totalPages={Math.ceil((report.rows.length || 1) / 10)} onPageChange={setPage} />
              </div>
            </>
          ) : (
            <EmptyState title="Nenhum dado encontrado" description="Nenhuma transação registrada para o período selecionado." />
          )}
        </UiCard>
      </div>
    </AppPageContainer>
  )

}