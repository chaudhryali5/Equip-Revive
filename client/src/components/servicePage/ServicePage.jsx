import React, { useContext, useState, useMemo, useEffect, useRef } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NavLink } from 'react-router'
import { StoreContext } from '@/storeContext'
import { FiSearch, FiFilter } from 'react-icons/fi'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ServicePage = () => {
    const headerRef = useRef(null)
    const searchRef = useRef(null)
    const cardsRef = useRef(null)
    const { service } = useContext(StoreContext)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')

    const categories = useMemo(() => {
        if (!service?.length) return ['All']
        return ['All', ...new Set(service.map(s => s.category))]
    }, [service])

    const filteredServices = useMemo(() => {
        if (!service) return []
        return service.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
            return matchesSearch && matchesCategory
        })
    }, [service, searchQuery, selectedCategory])

    useEffect(() => {
        // Animate header on mount
        if (headerRef.current) {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: -50 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
            )
        }

        // Animate search bar
        if (searchRef.current) {
            gsap.fromTo(searchRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power2.out' }
            )
        }

        // Animate service cards with stagger
        if (cardsRef.current) {
            const cards = cardsRef.current.querySelectorAll('.service-card')
            gsap.fromTo(cards,
                { opacity: 0, y: 50, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: 'back.out(1.2)',
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        }
    }, [filteredServices])

    return (
        <section className="py-16 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            <div className="container w-[90%] mx-auto px-4 lg:px-6 relative z-10">
                <div ref={headerRef} className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                        <FiFilter className="w-5 h-5" />
                        <span className="text-sm font-semibold">Find Your Service</span>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">
                        Our Professional Services
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Browse through our comprehensive range of professional services
                    </p>
                </div>

                <div ref={searchRef} className="mb-10 space-y-6">
                    <div className="max-w-2xl mx-auto relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            type="text"
                            placeholder="Search services by name or description..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="pl-12 pr-4 py-6 text-base rounded-xl border-2 border-slate-200 focus:border-primary transition-all shadow-sm hover:shadow-md"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(category => (
                            <Button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                variant={selectedCategory === category ? "default" : "outline"}
                                className={`
                                    px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105
                                    ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg shadow-primary/30'
                                        : 'border-2 border-slate-200 hover:border-primary hover:bg-primary/5'
                                    }
                                `}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                <p className="mb-6 text-center text-sm text-muted-foreground">
                    Showing <span className="font-semibold text-primary">{filteredServices.length}</span> service{filteredServices.length !== 1 ? 's' : ''}
                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                </p>

                {filteredServices.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                            <FiSearch className="w-10 h-10 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">No Services Found</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Try adjusting your search or filter to find what you're looking for
                        </p>
                        <Button
                            onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}
                            className="bg-primary hover:bg-primary/90"
                        >
                            Clear Filters
                        </Button>
                    </div>
                ) : (
                    <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredServices.map(item => (
                            <Card
                                key={item._id}
                                className="service-card flex flex-col hover:shadow-2xl hover:scale-101 transition-all duration-500 border-primary/10 overflow-hidden group bg-white dark:bg-slate-900 h-full relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

                                <div className="h-56 w-full overflow-hidden relative">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/20 transition-colors duration-300" />
                                    <span className="absolute top-4 right-4 bg-gradient-to-r from-primary to-purple-600 text-white border-0 px-3 py-1 text-xs font-semibold shadow-lg rounded-full transform group-hover:scale-110 transition-transform duration-300">
                                        {item.category}
                                    </span>
                                </div>

                                <CardHeader className="pb-3">
                                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                                        {item.name}
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="grow pb-3">
                                    <CardDescription className="text-base line-clamp-3 mb-4">
                                        {item.description}
                                    </CardDescription>
                                    <div className="flex items-center text-sm font-medium text-muted-foreground">
                                        <span className="text-primary font-bold mr-2">Range:</span>
                                        <span className="line-clamp-1">{item.price}</span>
                                    </div>
                                </CardContent>

                                <CardFooter className="p-4 pt-0 mt-auto">
                                    <NavLink to={`/service/${item._id}`} className="w-full">
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

export default ServicePage
