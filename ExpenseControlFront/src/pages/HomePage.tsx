import { useNavigate } from 'react-router-dom'
import { UiButton } from '@/components/Ui/buttom/UiButton'
import { UiCard } from '@/components/Ui/card/UiCard'
import { AppPageContainer } from '@/components/layout/AppPageContainer'
import { HomeHeader } from '@/features/home/components/HomeHeader'

const homeActions = [
  {
    title: 'Pessoas',
    description: 'Cadastre e gerencie as suas pessoas.',
    buttonLabel: 'Cadastrar pessoas',
    path: '/pessoas',
  },
  {
    title: 'Transações',
    description: 'Registre receitas e despesas.',
    buttonLabel: 'Cadastrar transações',
    path: '/transacoes',
  },
  {
    title: 'Consultas',
    description: 'Veja os totais gerais.',
    buttonLabel: 'Ver consultas totais',
    path: '/consultas-totais',
  },
]

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <AppPageContainer>
      <div className="space-y-6">
        <HomeHeader name="Usuário" />

        <div className="grid gap-4 md:grid-cols-3">
          {homeActions.map((action) => (
            <UiCard key={action.path} title={action.title} description={action.description}>
              <UiButton fullWidth onClick={() => navigate(action.path)}>
                {action.buttonLabel}
              </UiButton>
            </UiCard>
          ))}
        </div>
      </div>
    </AppPageContainer>
  )
}
