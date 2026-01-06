import { useContext } from 'react'
import { AdminContext } from '@/AdminContext'
import { Link } from 'react-router-dom'
import { Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { assets } from '@/assets/assets.js'
import { toast } from 'react-hot-toast'

const Navbar = ({ toggleSidebar }) => {
    const { setToken } = useContext(AdminContext);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        setToken("");
        toast.success("Logged out successfully");
        window.location.href = import.meta.env.VITE_FRONTEND_URL;
    }

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-800 bg-black px-8 shadow-md">
            <Button
                variant="ghost"
                size="icon"
                className="shrink-0 md:hidden text-white hover:bg-gray-800 hover:text-white"
                onClick={toggleSidebar}
            >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
            </Button>

            <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-3">
                    <img src={assets.logo} alt="Logo" className="w-14 h-14 object-contain brightness-0 invert" />
                    <span className="hidden md:block text-2xl font-bold tracking-tighter text-white">ADMIN<span className="font-light text-gray-400">PANEL</span></span>
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    onClick={handleLogout}
                    className="bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-300 font-medium px-6 rounded-full"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </header>
    )
}

export default Navbar
