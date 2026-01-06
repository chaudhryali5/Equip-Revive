import React from 'react'
import { FaHome, FaCar, FaLaptop } from "react-icons/fa";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ServicesData } from '@/constant/ServicesData'
import { NavLink } from 'react-router'
import { useNavigate } from 'react-router-dom'

const ServicesCard = () => {
    const navigate = useNavigate()
    const repairServices = [
        {
            title: "Home Appliance",
            description: "Expert repair for all your home appliances. We ensure your daily essentials are running smoothly.",
            icon: <FaHome className="w-8 h-8 text-white" />,
            features: ["Refrigerators & Freezers", "Washing Machines", "Air Conditioners", "Microwaves & Ovens"]
        },
        {
            title: "Automobiles",
            description: "Professional auto repair and maintenance services. Keep your vehicle safe and road-ready.",
            icon: <FaCar className="w-8 h-8 text-white" />,
            features: ["Engine Diagnostics", "Brake Services", "Tire Replacement", "Oil & Filter Change"]
        },
        {
            title: "Tech Gadgets",
            description: "Fast and reliable repair services for your digital devices. We bring your tech back to life.",
            icon: <FaLaptop className="w-8 h-8 text-white" />,
            features: ["Smartphone Screens", "Laptop Batteries", "Data Recovery", "Hardware Upgrades"]
        },
    ];

    return (
        <section className="py-16 bg-slate-50 dark:bg-slate-950">
            <div className="w-[90%] mx-auto px-4 lg:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">What We Offer</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Professional solutions for all your industrial equipment needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ServicesData.map((service, index) => (
                        <Card key={index} className="flex flex-col hover:shadow-lg transition-shadow duration-300 border-primary/10 overflow-hidden group bg-white dark:bg-slate-900">
                            <div className="h-48 w-full overflow-hidden relative">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                        {service.icon}
                                    </div>
                                    <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="grow">
                                <CardDescription className="text-base line-clamp-3">
                                    {service.description}
                                </CardDescription>
                            </CardContent>
                            <NavLink to={'/services'} className="mt-auto">
                                <CardFooter className="p-4 border-t bg-muted/5">
                                    <Button onClick={() => navigate("/services")} className="w-full font-semibold group-hover:bg-primary group-hover:text-white transition-all duration-300" variant="ghost">
                                        View Service
                                    </Button>
                                </CardFooter>
                            </NavLink>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="w-[90%] mx-auto px-4 lg:px-6 mt-24">
                <div className="text-center mb-16">
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm">Expert Solutions</span>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mt-2">What We Repair</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Specialized repair services for your essential devices and vehicles. We handle it all with care and precision.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {repairServices.map((service, index) => (
                        <Card key={index} className="flex flex-col relative overflow-hidden group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-900">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                            <CardHeader className="flex flex-col items-center pt-10 pb-6">
                                <div className="p-5 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6">
                                    {service.icon}
                                </div>
                                <CardTitle className="text-2xl font-bold text-center">{service.title}</CardTitle>
                            </CardHeader>

                            <CardContent className="grow px-8">
                                <p className="text-center text-muted-foreground mb-8">
                                    {service.description}
                                </p>
                                <div className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>

                            <CardFooter className="p-8 pt-4 flex justify-center">
                                <Button onClick={() => navigate("/services")} className="w-full rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300" size="lg">
                                    View Service
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ServicesCard