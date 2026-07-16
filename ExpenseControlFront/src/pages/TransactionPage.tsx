import { useMemo, useState } from 'react'
import { UiButton } from '@/components/Ui/buttom/UiButton'
import { UiCard } from '@/components/Ui/card/UiCard'
import { AppPageContainer } from '@/components/layout/AppPageContainer'
import { EmptyState } from '@/components/Ui/EmptyState'
import { Loading } from '@/components/Ui/Loading'
import { TransactionForm } from '@/features/transacoes/components/TransactionForm'
import { TransactionSearch } from '@/features/transacoes/components/TransactionSearch'
import { TransactionTable } from '@/features/transacoes/components/TransactionTable'
import { useUsers } from '@/features/usuarios/hooks/useUsers'
import { useTransactions } from '@/features/transacoes/hooks/useTransactions'
import { useCreateTransaction } from '@/features/transacoes/hooks/useCreateTransaction'
import { useToastContext } from '@/providers/toast-provider'
import { Pagination } from '@/features/consulta/components/Pagination'

/**
 * Página de cadastro e listagem de transações.
 * Replica no frontend a regra do backend que impede receita para menores de 18 anos.
 */
export function TransactionPage() {
  const { users, loading: peopleLoading } = useUsers()
  const { transactions, loading: transactionsLoading, error, refetch, page, totalPages, setPage } = useTransactions()
  const { create, error: createError } = useCreateTransaction()
  const toast = useToastContext()

  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formValues, setFormValues] = useState({ userId: '', description: '', value: 0, type: 1 })

  /** Filtra transações da página atual por descrição ou nome da pessoa vinculada. */
  const filteredTransactions = useMemo(() => {
    const term = search.toLowerCase()
    return transactions.filter((transaction) => {
      const userName = transaction.userName?.toLowerCase() ?? ''
      return transaction.description?.toLowerCase().includes(term) || userName.includes(term)
    })
  }, [transactions, search])

  const selectedPerson = users.find((person) => String(person.id) === formValues.userId)

  /** Indica se a pessoa selecionada está impedida de registrar receita (idade &lt; 18). */
  const isReceitaBlocked = Boolean(selectedPerson && selectedPerson.age < 18)

  /** Reseta o formulário e encerra o painel de nova transação. */
  const handleCloseForm = () => {
    setIsFormOpen(false)
    setFormValues({ userId: '', description: '', value: 0, type: 1 })
  }

  /**
   * Valida campos obrigatórios e a regra de receita para menores antes de persistir.
   * Tipo `0` = receita, `1` = despesa.
   */
  const handleSubmit = async () => {
    if (!formValues.description.trim() || !formValues.userId || Number(formValues.value) <=0) {
      toast.show('Preencha todos os campos obrigatórios', 'error')
      return
    }

    if (isReceitaBlocked && Number(formValues.type) === 0) {
      toast.show('Receita bloqueada para menores de 18 anos', 'error')
      return
    }

    const result = await create({
      userId: formValues.userId.trim(),
      description: formValues.description.trim(),
      value: Number(formValues.value),
      type: Number(formValues.type) as 0 | 1, // 0 = Receita, 1 = Despesa
    })

    if (result) {
      toast.show('Transação cadastrada com sucesso', 'success')
      setFormValues({ userId: '', description: '', value: 0, type: 1 })
      refetch()
    } else {
      toast.show(createError || 'Erro ao criar transação', 'error')
    }
  }

  const loading = peopleLoading || transactionsLoading

  if (loading) {
    return (
      <AppPageContainer>
        <Loading message="Carregando transações..." />
      </AppPageContainer>
    )
  }

  if (error) {
    return (
      <AppPageContainer>
        <EmptyState
          title="Erro ao carregar transações"
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
            <h2 className="text-2xl font-semibold text-slate-900">Cadastro de Transações</h2>
            <p className="text-sm text-slate-600">Cadastre receitas e despesas.</p>
          </div>
          {!isFormOpen ? (
            <UiButton onClick={() => setIsFormOpen(true)}>Nova Transação</UiButton>
          ) : null}
        </div>

        {isFormOpen ? (
          <TransactionForm
            values={formValues}
            users={users.map((user) => ({ id: user.id, name: user.name, age: user.age }))}
            isReceitaBlocked={isReceitaBlocked}
            onChange={(field, value) => {
              if (field === 'type' && isReceitaBlocked && Number(value) === 0) {
                return
              }

              if (field === 'value') {
                setFormValues((current) => ({ ...current, value: Number(value) }))
                return
              }

              setFormValues((current) => ({ ...current, [field]: value }))
            }}
            onClose={handleCloseForm}
            onSubmit={handleSubmit}
          />
        ) : null}

        <UiCard title="Transações cadastradas" description="Filtre pelos dados da transação para encontrar um registro.">
          <div className="mb-4">
            <TransactionSearch value={search} onChange={setSearch} />
          </div>
          {filteredTransactions.length > 0 ? (
            <><TransactionTable transactions={filteredTransactions} /><Pagination page={page} totalPages={totalPages} onPageChange={setPage} /></>
          ) : (
            <EmptyState title="Nenhuma transação encontrada" description="Cadastre uma nova transação para começar." />
          )}
        </UiCard>
      </div>
    </AppPageContainer>
  )
}
