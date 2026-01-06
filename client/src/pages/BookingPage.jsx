import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import WebLayout from '@/layout/WebLayout'
import { useForm } from 'react-hook-form'
import { PLACE_ORDER_URL } from '@/assets/api'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import { StoreContext } from '@/storeContext'

const BookingPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { service, token } = useContext(StoreContext)
    const [currentService, setCurrentService] = useState(null)

    const { register, handleSubmit } = useForm()

    useEffect(() => {
        if (service && service.length > 0) {
            const foundService = service.find((item) => item._id === id)
            if (foundService) {
                setCurrentService(foundService)
            }
        }
    }, [service, id])

    const handleOrderSubmit = async (data) => {
        if (!token) {
            toast.error("You must be logged in to book a service")
            return
        }

        try {
            const response = await axios.post(PLACE_ORDER_URL, { ...data, serviceId: id }, { headers: { token } })
            if (response.data.status) {
                toast.success(response.data.message || "Booking placed successfully!")
                navigate('/my-bookings') // Or wherever appropriate
            } else {
                console.log(response.data)
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Failed to place booking")
        }
    }

    if (!currentService) {
        return <div className='min-h-screen flex items-center justify-center'>Loading...</div>
    }

    return (
        <WebLayout>
            <div className="w-4/5 mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Service Details Side */}
                    <div className="space-y-4">
                        <div className="rounded-xl overflow-hidden shadow-md">
                            <img
                                src={currentService.image}
                                alt={currentService.name}
                                className="w-full h-64 object-cover"
                            />
                        </div>
                        <div>
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-2">
                                {currentService.category}
                            </span>
                            <h1 className="text-2xl font-bold mb-2">{currentService.name}</h1>
                            <p className="text-base text-muted-foreground mb-4">
                                {currentService.description}
                            </p>
                            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                                <h3 className="text-lg font-semibold mb-1">Service Details</h3>
                                <p className="text-sm text-muted-foreground">
                                    <span className="font-bold text-foreground">Estimated Price:</span> {currentService.price}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form Side */}
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800">
                        <h2 className="text-xl font-bold mb-4">Book This Service</h2>
                        <form onSubmit={handleSubmit(handleOrderSubmit)} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input {...register("name")} required placeholder="John Doe" className="h-9" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Phone Number</label>
                                <Input {...register("phone")} required type="tel" placeholder="+1 (555) 000-0000" className="h-9" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Address</label>
                                <Input {...register("address")} required placeholder="123 Main St, City, Country" className="h-9" />
                            </div>

                            <div className="space-y-1.5 flex flex-col">
                                <label className="text-sm font-medium">Preferred Date</label>
                                <Input {...register("date")} required type="date" className="w-full h-9" />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Problem Description</label>
                                <textarea
                                    {...register("problem")}
                                    required
                                    placeholder="Describe the issue you are facing..."
                                    className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>

                            <Button type="submit" className="w-full text-base py-3 h-10">
                                Confirm Booking
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </WebLayout>
    )
}

export default BookingPage
