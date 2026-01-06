import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routes from './routes/Routes.jsx'
import { Toaster } from 'react-hot-toast'
import StoreContextProvider from './context/StoreContextProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_CLIENT_ID}`}>
    <StoreContextProvider>
      <StrictMode>
        <Toaster />
        <Routes />
      </StrictMode>
    </StoreContextProvider>
  </GoogleOAuthProvider>)
