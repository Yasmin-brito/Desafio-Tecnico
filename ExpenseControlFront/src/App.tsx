import './App.css'
import { RouterProvider } from 'react-router-dom'
import { ToastProvider } from '@/providers/toast-provider'
import { router } from './routes/router'

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  )
}

export default App
