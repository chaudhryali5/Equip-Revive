import { DELETE_SERVICE, LIST_SERVICE } from "@/resources/api";
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FiTrash2, FiPackage } from "react-icons/fi"
import { BiLoaderAlt } from "react-icons/bi"
import { useNavigate } from "react-router";
import { AdminContext } from "@/AdminContext";


const ListService = () => {
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState(null)
    const navigate = useNavigate()
    const { token } = useContext(AdminContext)
    const fetchService = async () => {
        try {
            setLoading(true)
            const response = await axios.get(LIST_SERVICE);
            if (response.data.status === true) {
                setList(response.data.services);
            } else {
                toast.error("Error fetching list");
            }
        } catch (error) {
            toast.error("Failed to fetch list");
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    const deleteService = async (id) => {
        if (!window.confirm("Are you sure you want to delete this service?")) {
            return;
        }

        try {
            setDeleting(id)
            const response = await axios.delete(`${DELETE_SERVICE.replace(':id', id)}`, {
                headers: { token: token }
            });

            if (response.data.status === true) {
                toast.success(response.data.message);
                await fetchService();
            } else {
                toast.error(response.data.message || "Error removing");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to remove");
            console.error(err);
        } finally {
            setDeleting(null)
        }
    };

    useEffect(() => {
        fetchService()
    }, [])

    return (
        <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                        Manage Services
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base">
                        View and manage all your services
                    </p>
                </div>
                {loading && (
                    <div className="text-center py-20">
                        <BiLoaderAlt className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                        <p className="text-slate-600">Loading services...</p>
                    </div>
                )}
                {!loading && list.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-4">
                            <FiPackage className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">No Services Found</h3>
                        <p className="text-slate-600 mb-6">Get started by adding your first service</p>
                        <Button
                            onClick={() => navigate('/add-service')}
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            Add Service
                        </Button>
                    </div>
                )}
                {!loading && list.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {list.map((service) => (
                            <Card
                                key={service._id}
                                className="flex flex-col hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 border-slate-200 overflow-hidden group bg-white h-full relative"
                            >

                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
                                {/* Image Section */}
                                <div className="h-40 sm:h-48 w-full overflow-hidden relative">
                                    <img
                                        src={service.image}
                                        alt={service.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/20 transition-colors duration-300" />
                                    <span className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 sm:px-3 py-1 text-xs font-semibold shadow-lg rounded-full transform group-hover:scale-110 transition-transform duration-300">
                                        {service.category}
                                    </span>
                                </div>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base sm:text-lg font-bold group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                                        {service.name}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="grow pb-3">
                                    <CardDescription className="text-sm line-clamp-2 sm:line-clamp-3 mb-3">
                                        {service.description}
                                    </CardDescription>
                                    <div className="flex items-center text-xs sm:text-sm font-medium text-slate-600">
                                        <span className="text-blue-600 font-bold mr-2">Price:</span>
                                        <span className="line-clamp-1">{service.price}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-3 sm:p-4 pt-0 mt-auto">
                                    <Button
                                        onClick={() => deleteService(service._id)}
                                        disabled={deleting === service._id}
                                        variant="destructive"
                                        className="w-full font-semibold shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base py-2"
                                    >
                                        {deleting === service._id ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <BiLoaderAlt className="w-4 h-4 animate-spin" />
                                                Deleting...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                <FiTrash2 className="w-4 h-4" />
                                                Delete Service
                                            </span>
                                        )}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
                {!loading && list.length > 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-sm text-slate-600">
                            Showing <span className="font-semibold text-slate-800">{list.length}</span> service{list.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListService