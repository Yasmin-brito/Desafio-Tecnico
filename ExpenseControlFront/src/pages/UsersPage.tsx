import { useMemo, useState } from 'react'
import { UiButton } from '@/components/Ui/buttom/UiButton'
import { UiCard } from '@/components/Ui/card/UiCard'
import { AppPageContainer } from '@/components/layout/AppPageContainer'
import { EmptyState } from '@/components/Ui/EmptyState'
import { Loading } from '@/components/Ui/Loading'
import { UserDeleteDialog } from '@/features/usuarios/components/UserDeleteDialog'
import { UserForm } from '@/features/usuarios/components/UserForm'
import { UserSearch } from '@/features/usuarios/components/UserSearch'
import { UserTable } from '@/features/usuarios/components/UserTable'
import { useUsers } from '@/features/usuarios/hooks/useUsers'
import { useCreateUser } from '@/features/usuarios/hooks/useCreateUser'
import { useDeleteUser } from '@/features/usuarios/hooks/useDeleteUser'
import { useToastContext } from '@/providers/toast-provider'
import { Pagination } from '@/features/consulta/components/Pagination'

/**
 * Página de cadastro e gestão de pessoas.
 * Aplica busca local por nome sobre a lista paginada vinda da API.
 */
export function UsersPage() {
  const { users, loading, error, refetch, page, totalPages, setPage } = useUsers()
  const { create, error: createError } = useCreateUser()
  const { deleteUser } = useDeleteUser()
  const toast = useToastContext()

  const [search, setSearch] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
  const [formValues, setFormValues] = useState({ name: '', age: 0 })
  const [formErrors, setFormErrors] = useState<{ name?: string; age?: string }>({})

  /** Filtra a página atual de usuários pelo termo digitado (case-insensitive). */
  const filteredPeople = useMemo(() => {
    const term = search.toLowerCase()
    return users.filter((user) => (user.name ?? "").toLowerCase().includes(term))
  }, [users, search])

  /** Resolve o nome exibido no diálogo de confirmação de exclusão. */
  const selectedUserName = useMemo(() => {
    if (selectedUserId === null) {
      return ''
    }
    return users.find((user) => user.id === selectedUserId)?.name ?? ''
  }, [users, selectedUserId])

  /** Limpa o formulário e fecha o painel de cadastro. */
  const handleCloseForm = () => {
    setIsFormOpen(false)
    setFormValues({ name: '', age: 0 })
    setFormErrors({})
  }

  /**
   * Valida nome e idade antes de enviar ao backend.
   * Exige nome não vazio e idade numérica maior ou igual a zero.
   */
  const handleSubmit = async () => {
    const errors: { name?: string; age?: string } = {}

    if (!formValues.name.trim()) {
      errors.name = 'Nome é obrigatório'
    }

    if (!formValues.age || Number(formValues.age) < 0) {
      errors.age = 'Idade deve ser um número válido'
    }

    if (errors.name || errors.age) {
      setFormErrors(errors)
      return
    }

    setFormErrors({})
    const result = await create({ name: formValues.name.trim(), age: Number(formValues.age) })
    if (result) {
      toast.show('Pessoa cadastrada com sucesso', 'success')
      setFormValues({ name: '', age: 0 })
      setFormErrors({})
      refetch()
    } else {
      setFormErrors({ name: createError || 'Erro ao cadastrar pessoa' })
    }
  }

  /** Abre o dialogo de confirmação para o usuário selecionado. */
  const handleDelete = (id: string) => {
    setSelectedUserId(id)
  }

  /** Confirma a exclusão e atualiza a listagem em caso de sucesso. */
  const confirmDelete = async () => {
    if (selectedUserId === null) {
      return
    }

    const success = await deleteUser(selectedUserId)
    if (success) {
      setSelectedUserId(null)
      refetch()
    }
  }

  if (loading) {
    return (
      <AppPageContainer>
        <Loading message="Carregando pessoas..." />
      </AppPageContainer>
    )
  }

  if (error) {
    return (
      <AppPageContainer>
        <EmptyState
          title="Erro ao carregar pessoas"
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
            <h2 className="text-2xl font-semibold text-slate-900">Cadastro de Pessoas</h2>
            <p className="text-sm text-slate-600">Gerencie os cadastros de suas pessoas.</p>
          </div>
          {!isFormOpen ? (
            <UiButton onClick={() => setIsFormOpen(true)}>Cadastrar Pessoa</UiButton>
          ) : null}
        </div>

        {isFormOpen ? (
          <UserForm
            values={formValues}
            errors={formErrors}
            onChange={(field, value) => {
              setFormValues((current) => ({ ...current, [field]: value }))
              setFormErrors((current) => ({ ...current, [field]: undefined }))
            }}
            onClose={handleCloseForm}
            onSubmit={handleSubmit}
          />
        ) : null}

        <UiCard title="Pessoas cadastradas" description="Use a busca para localizar uma pessoa cadastrada.">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <UserSearch value={search} onChange={setSearch} />
          </div>
          {filteredPeople.length > 0 ? (
            <><UserTable users={filteredPeople} onDelete={handleDelete} /><Pagination page={page} totalPages={totalPages} onPageChange={setPage} /></>
          ) : (
            <EmptyState title="Nenhuma pessoa encontrada" description="Nenhum resultado encontrado para essa busca." />
          )}
        </UiCard>
      </div>

      <UserDeleteDialog
        open={selectedUserId !== null}
        name={selectedUserName}
        onCancel={() => setSelectedUserId(null)}
        onConfirm={confirmDelete}
      />
    </AppPageContainer>
  )
}