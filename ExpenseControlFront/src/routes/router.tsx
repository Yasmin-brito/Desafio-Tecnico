import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { DashboardPage } from '@/pages/HomePage'
import { UsersPage } from '@/pages/UsersPage'
import { TransactionPage } from '@/pages/TransactionPage'
import { ReportsPage } from '@/pages/ReportsPage'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                index: true,
                element: <DashboardPage/>
            },
            {
                path:"pessoas",
                element: <UsersPage/>
            },
            {
                path:"transacoes",
                element: <TransactionPage/>
            },
            {
                path: "consultas-totais",
                element: <ReportsPage/>
            }
        ],
    },
])