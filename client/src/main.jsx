import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routes  from './routes/Routes.jsx'
import { Toaster } from 'react-hot-toast'
import StoreContextProvider from './context/StoreContextProvider'

createRoot(document.getElementById('root')).render(
  <StoreContextProvider>
    <StrictMode>
      <Toaster/>
      <Routes />
    </StrictMode>
  </StoreContextProvider>
)
