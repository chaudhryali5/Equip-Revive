import { UPDATE_STATUS, USER_ORDER } from "@/resources/api"
import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { toast } from "react-hot-toast"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
    Package,
    Search,
    Calendar,
    User,
    Phone,
    MapPin,
    FileText,
    Loader2,
    Tag
} from "lucide-react"
import { AdminContext } from "@/AdminContext"

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const { token } = useContext(AdminContext)

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await axios.get(USER_ORDER, {
                headers: { token: token }
            })
            if (response.data.status) {
                setOrders(response.data.data)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch orders")
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (orderId, newStatus) => {
        try {
            const response = await axios.post(UPDATE_STATUS.replace(':id', orderId), {
                status: newStatus
            })
            if (response.data.status) {
                toast.success("Status updated successfully")
                await fetchOrders()
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status")
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    const getStatusColor = (status) => {
        const statusLower = status?.toLowerCase() || 'pending'
        const colors = {
            pending: 'bg-amber-100 text-amber-700 border-amber-200',
            processing: 'bg-blue-100 text-blue-700 border-blue-200',
            completed: 'bg-green-100 text-green-700 border-green-200',
            cancelled: 'bg-red-100 text-red-700 border-red-200'
        }
        return colors[statusLower] || 'bg-slate-100 text-slate-700 border-slate-200'
    }

    const formatDate = (dateString) => {
        if (!dateString) return "N/A"
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        })
    }

    const filteredOrders = orders.filter(order =>
        order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone?.includes(searchTerm) ||
        order.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="w-full p-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Package className="h-8 w-8 text-primary" />
                        Orders Management
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage and track all service bookings
                    </p>
                </div>
                <Badge variant="outline" className="px-3 py-1 w-fit">
                    Total Orders: {orders.length}
                </Badge>
            </div>

            {/* Search Bar */}
            <Card>
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by customer name, phone, service, or status..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Orders Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Package className="h-12 w-12 text-slate-400 mb-3" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                        No orders found
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        {searchTerm ? "Try adjusting your search" : "No orders have been placed yet"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredOrders.map((order, index) => (
                        <Card key={order._id || index} className="shadow-md transition-shadow duration-200">
                            <CardHeader className="pb-3 px-4 pt-4">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-start gap-2 flex-1 min-w-0">
                                        <div className="p-2 bg-primary/10 rounded-md shrink-0">
                                            <FileText className="h-4 w-4 text-primary" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-semibold text-sm text-slate-900 break-words">
                                                {order.serviceName || "Unknown Service"}
                                            </h3>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <Tag className="h-3 w-3 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground truncate">
                                                    {order.category || "General"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge
                                        variant="outline"
                                        className={`${getStatusColor(order.status)} font-medium text-xs px-2 py-0.5 shrink-0`}
                                    >
                                        {order.status || 'Pending'}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3 px-4 pb-4">
                                {/* Order ID */}
                                <div className="flex items-center gap-2 text-sm pb-2 border-b">
                                    <span className="text-xs text-muted-foreground">Order ID:</span>
                                    <span className="font-mono text-xs">#{order._id?.slice(-6) || 'N/A'}</span>
                                </div>

                                {/* Customer Name */}
                                <div className="flex items-center gap-2 text-sm">
                                    <User className="h-4 w-4 text-slate-400 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-muted-foreground">Customer</p>
                                        <p className="font-medium text-sm truncate">{order.name || 'N/A'}</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-muted-foreground">Phone</p>
                                        <p className="font-medium text-sm truncate">{order.phone || 'N/A'}</p>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-2 text-sm">
                                    <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-muted-foreground">Address</p>
                                        <p className="font-medium text-sm line-clamp-2">{order.address || 'N/A'}</p>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-4 w-4 text-slate-400 shrink-0" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-muted-foreground">Booking Date</p>
                                        <p className="font-medium text-sm">{formatDate(order.date)}</p>
                                    </div>
                                </div>

                                {/* Problem */}
                                <div className="flex items-start gap-2 text-sm">
                                    <FileText className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-muted-foreground">Problem</p>
                                        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">
                                            {order.problem || 'No description'}
                                        </p>
                                    </div>
                                </div>

                                {/* Status Update */}
                                <div className="pt-2 border-t">
                                    <p className="text-xs text-muted-foreground mb-2">Update Status</p>
                                    <Select
                                        value={order.status}
                                        onValueChange={(value) => updateStatus(order._id, value)}
                                    >
                                        <SelectTrigger className="w-full h-9">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Pending">Pending</SelectItem>
                                            <SelectItem value="Processing">Processing</SelectItem>
                                            <SelectItem value="Completed">Completed</SelectItem>
                                            <SelectItem value="Cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Orders