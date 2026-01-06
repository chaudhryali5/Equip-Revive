import Navbar from '@/components/navbar/Navbar'
import SideBar from '@/components/sidebar/SideBar'
import AddService from '@/pages/AddService'
import ListService from '@/pages/ListService'
import Orders from '@/pages/Orders'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState, useContext } from 'react'
import { AdminContext } from '@/AdminContext'


const Router = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { token } = useContext(AdminContext)

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen)
    }

    if (!token) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center p-8 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
                    <p className="text-gray-600 mb-4">Please login through the main website.</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <ToastContainer />
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
    )
}

export default Router