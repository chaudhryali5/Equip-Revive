import { StoreContext } from "@/storeContext"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { ORDER_LIST_URL } from "@/assets/api"
import WebLayout from "@/layout/WebLayout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, User, Phone, FileText, Tag, AlertCircle } from "lucide-react"

const MyBookings = () => {
    const { token } = useContext(StoreContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await axios.get(ORDER_LIST_URL, { headers: { token } })
            if (response.data.status && Array.isArray(response.data.data)) {
                setOrders(response.data.data)
            } else {
                setOrders([])
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch orders")
            setOrders([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [token])

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    return (
        <WebLayout>
            <div className="w-[90%] mx-auto px-2 py-8">
                <div className="mb-6 text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        My Bookings
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Track your service appointments
                    </p>
                </div>

                {loading ? (
                    <div className="min-h-[60vh] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed">
                        <Calendar className="h-12 w-12 text-slate-400 mb-3" />
                        <h3 className="text-base font-medium text-slate-900 dark:text-white">
                            No bookings found
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            You haven't booked any services yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {orders.map((order, index) => (
                            <Card
                                key={index}
                                className="w-full shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
                            >
                                <CardHeader className="pb-2 px-3 pt-3">
                                    <div className="flex items-center justify-between gap-2 w-full min-w-0">
                                        <div className="flex items-center gap-2 flex-1 min-w-0">
                                            <div className="p-2 bg-primary/10 rounded-md shrink-0">
                                                <FileText className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                                                    {order.serviceName || order.item?.name || "Service"}
                                                </h3>
                                                <div className="flex items-center gap-1 mt-0.5">
                                                    <Tag className="h-3 w-3 text-muted-foreground" />
                                                    <span className="text-xs text-muted-foreground truncate">
                                                        {order.category || order.item?.category || "General"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className="px-2 py-0.5 rounded-full text-xs font-medium border shrink-0 text-center truncate">
                                            {order.status || "Pending"}
                                        </span>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-3 pt-0 px-3 pb-3">
                                    <div className="flex items-center gap-2 text-sm min-w-0">
                                        <User className="h-4 w-4 text-slate-400 shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">Client</p>
                                            <p className="font-medium text-sm truncate">
                                                {order.name || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm min-w-0">
                                        <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">Phone</p>
                                            <p className="font-medium text-sm truncate">
                                                {order.phone || "N/A"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Booking Date</p>
                                            <p className="font-medium text-sm">
                                                {formatDate(order.date)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2 text-sm min-w-0">
                                        <AlertCircle className="h-4 w-4 text-slate-400 shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-xs text-muted-foreground">Problem</p>
                                            <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                                                {order.problem || order.description || "No description"}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </WebLayout>
    )
}

export default MyBookings
