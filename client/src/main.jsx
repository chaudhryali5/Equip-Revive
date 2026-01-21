import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routes from './routes/Routes.jsx'
import { Toaster } from 'react-hot-toast'
import StoreContextProvider from './context/StoreContextProvider'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(

    <StoreContextProvider>
        <GoogleOAuthProvider clientId="225983323866-s9tpvo68ddaodjtdce9urkh02mb24q9n.apps.googleusercontent.com">
        <Toaster />
        <Routes />
        </GoogleOAuthProvider>
    </StoreContextProvider>)
