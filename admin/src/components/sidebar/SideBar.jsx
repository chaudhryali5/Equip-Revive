import { NavLink } from "react-router-dom"
import { PackagePlus, ListOrdered, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

const SideBar = ({ isOpen, toggleSidebar }) => {
    const navItems = [
        {
            title: "Upload Service",
            icon: PackagePlus,
            href: "/add-service",
        },
        {
            title: "Manage Services",
            icon: ListOrdered,
            href: "/list-service",
        },
        {
            title: "Orders",
            icon: ShoppingBag,
            href: "/orders",
        },
    ]

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={toggleSidebar}
                />
            )}
            <div className={cn(
                "fixed md:relative inset-y-0 left-0 z-50 md:z-auto border-r border-gray-800 bg-black text-white w-64 min-h-[calc(100vh-80px)] p-6 transition-transform duration-300 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col gap-6">
                    <nav className="grid items-start gap-4">
                        {navItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.href}
                                onClick={() => toggleSidebar && toggleSidebar()}
                                className={({ isActive }) =>
                                    cn(
                                        "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300",
                                        isActive
                                            ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                                            : "text-gray-400 hover:bg-gray-900 hover:text-white hover:pl-6"
                                    )
                                }
                            >
                                <item.icon className="h-5 w-5 transition-transform group-hover:rotate-12" />
                                {item.title}
                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>
        </>
    )
}

export default SideBar