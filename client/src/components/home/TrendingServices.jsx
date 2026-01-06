import React from 'react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { NavLink } from 'react-router'

const TrendingServices = () => {
    const trendingItems = [
        {
            title: "iPhone Screen Repair",
            tag: "Most Popular",
            price: "$99",
            image: "📱",
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            title: "Laptop Battery Replacement",
            tag: "Trending",
            price: "$149",
            image: "💻",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            title: "AC Servicing",
            tag: "Hot Deal",
            price: "$79",
            image: "❄️",
            gradient: "from-green-500 to-emerald-500"
        }
    ]

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            {/* Modern geometric background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 right-20 w-32 h-32 border-4 border-primary rotate-45"></div>
                <div className="absolute bottom-20 left-10 w-24 h-24 border-4 border-purple-500 rounded-full"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary/20 rotate-12"></div>
            </div>

            <div className="w-[90%] mx-auto px-4 lg:px-6 relative z-10">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1 h-8 bg-gradient-to-b from-primary to-purple-600 rounded-full"></div>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                Trending Now
                            </h2>
                        </div>
                        <p className="text-muted-foreground ml-4">Most requested services this week</p>
                    </div>
                    <NavLink to="/services" className="hidden md:block">
                        <Button variant="outline" className="group">
                            View All
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Button>
                    </NavLink>
                </div>

                {/* Trending Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {trendingItems.map((item, index) => (
                        <Card
                            key={index}
                            className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-slate-900"
                        >
                            {/* Gradient overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                            {/* Tag */}
                            <div className="absolute top-4 right-4 z-10">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${item.gradient} shadow-lg`}>
                                    {item.tag}
                                </span>
                            </div>

                            <div className="p-6 relative">
                                {/* Icon */}
                                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-500">
                                    {item.image}
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>

                                {/* Price and Button */}
                                <div className="flex items-center justify-between mt-4">
                                    <div>
                                        <span className="text-sm text-muted-foreground">Starting at</span>
                                        <div className={`text-2xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                                            {item.price}
                                        </div>
                                    </div>
                                    <NavLink to="/services">
                                        <Button
                                            size="sm"
                                            className={`bg-gradient-to-r ${item.gradient} hover:opacity-90 text-white border-0 shadow-md hover:shadow-lg transform hover:scale-105 transition-all`}
                                        >
                                            Book
                                        </Button>
                                    </NavLink>
                                </div>
                            </div>

                            {/* Bottom accent line */}
                            <div className={`h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                        </Card>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-8 text-center md:hidden">
                    <NavLink to="/services">
                        <Button variant="outline" className="group">
                            View All Services
                            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Button>
                    </NavLink>
                </div>
            </div>
        </section>
    )
}

export default TrendingServices
