import React, { useContext } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NavLink } from 'react-router'
import { StoreContext } from '@/storeContext'

const OurServices = () => {
    const { service } = useContext(StoreContext)

    return (
        <section className="py-16 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            <div className="container w-[90%] mx-auto px-4 lg:px-6 relative z-10">
                <div className="text-center mb-16">
                    {/* Decorative badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-semibold">Premium Services</span>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-black">
                        Our Professional Services
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        We offer a wide range of repair and maintenance services for your tech, home, and vehicle needs.
                    </p>
                </div>

                {/* Loading/Empty State */}
                {!service || service.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">Loading services...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {service.map((serviceItem, index) => (
                            <Card key={serviceItem._id} className="flex flex-col hover:shadow-2xl hover:scale-101 transition-all duration-500 border-primary/10 overflow-hidden group bg-white dark:bg-slate-900 h-full relative">
                                {/* Shimmer effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>

                                <div className="h-56 w-full overflow-hidden relative">
                                    <img
                                        src={serviceItem.image}
                                        alt={serviceItem.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/20 transition-colors duration-300" />
                                    <span className="absolute top-4 right-4 bg-gradient-to-r from-primary to-purple-600 text-white border-0 px-3 py-1 text-xs font-semibold shadow-lg rounded-full transform group-hover:scale-110 transition-transform duration-300">
                                        {serviceItem.category}
                                    </span>
                                </div>
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">{serviceItem.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="grow">
                                    <CardDescription className="text-base line-clamp-3 mb-4">
                                        {serviceItem.description}
                                    </CardDescription>
                                    <div className="flex items-center text-sm font-medium text-muted-foreground">
                                        <span className="text-primary font-bold mr-2">Range:</span> {serviceItem.price}
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0 mt-auto">
                                    <NavLink to={`/service/${serviceItem._id}`} className="w-full">
                                        <Button className="w-full font-semibold from-primary text-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                            Book Now →
                                        </Button>
                                    </NavLink>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default OurServices