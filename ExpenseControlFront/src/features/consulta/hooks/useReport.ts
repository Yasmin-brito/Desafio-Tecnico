import { useCallback, useEffect, useState } from 'react'
import { reportService, type ReportResponse } from '../services/reportService'

/**
 * Hook de consulta do relatório de saldos.
 * Reexecuta a busca sempre que o intervalo de datas (`params`) é alterado.
 */
export function useReport(params?: { startDate?: string; endDate?: string }) {
  const [report, setReport] = useState<ReportResponse>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /** Carrega o relatório consolidado para o período informado. */
  const fetchReport = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await reportService.getBalance(params)
      setReport(data)
      setLoading(false)
      setError(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao carregar relatório')
      setLoading(false)
    }
  }, [params])

  useEffect(() => {
    fetchReport()
  }, [fetchReport])

  return { report, loading, error, refetch: fetchReport }
}
