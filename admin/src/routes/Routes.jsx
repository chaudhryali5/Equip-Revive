import Navbar from '@/components/navbar/Navbar'
import SideBar from '@/components/sidebar/SideBar'
import AddService from '@/pages/AddService'
import ListService from '@/pages/ListService'
import Orders from '@/pages/Orders'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState, useContext } from 'react'
import { AdminContext } from '@/AdminContext'
import Admin from '@/pages/auth/Admin'

const Router = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { token } = useContext(AdminContext)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }



    return (
        <>
            <ToastContainer />
            {!token ? (
                <Admin />
            ) : (
                <>
                    <Navbar toggleSidebar={toggleSidebar} />
                    <hr />
                    <div className='flex'>
                        <SideBar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
                        <Routes>
                            <Route path='/add-service' element={<AddService />} />
                            <Route path='/list-service' element={<ListService />} />
                            <Route path='/orders' element={<Orders />} />
                        </Routes>
                    </div>
                </>
            )}
        </>
    )
}

export default Router