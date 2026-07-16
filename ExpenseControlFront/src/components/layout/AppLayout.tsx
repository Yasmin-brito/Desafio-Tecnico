import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppSideBar } from './AppSideBar'
import { AppTopBar } from './AppTopBar'

export function AppLayout(){
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className='flex h-screen flex-col bg-slate-100'>
            <AppTopBar onMenuClick={() => setSidebarOpen(true)} />
            <div className='flex flex-1 overflow-hidden'>
                <AppSideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                <main className='flex-1 overflow-y-auto p-6'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
