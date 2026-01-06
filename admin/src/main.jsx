import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

import Router from './routes/Routes'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AdminContextProvider from './context/AdminContextProvider'



createRoot(document.getElementById('root')).render(

   <BrowserRouter>
      <Toaster />
      <AdminContextProvider>
         <Router />
      </AdminContextProvider>
   </BrowserRouter>

)
