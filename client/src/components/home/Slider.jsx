import React from 'react'
import { assets } from '@/assets/assets'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { useNavigate } from 'react-router-dom'

const Slider = () => {
    const navigate = useNavigate()
    const plugin = React.useRef(
        Autoplay({ delay: 4000 })
    )

    return (
        <div className="w-full overflow-hidden">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                opts={{
                    align: "start",
                    loop: true,
                }}

            >
                <CarouselContent className="ml-0">{/* Remove gap between slides */}
                    <CarouselItem className="pl-0">{/* Remove left padding */}
                        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                            <img
                                src={assets.slider1}
                                alt="Equipment Repair Services"
                                className="w-full h-full object-cover "
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent  flex items-center">
                                <div className="text-white px-8 md:px-16 lg:px-24 max-w-2xl">
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                        Professional Equipment Repair
                                    </h2>
                                    <p className="text-lg md:text-xl mb-6">
                                        Expert repair services for all types of industrial machinery and equipment
                                    </p>
                                    <button onClick={() => navigate("/aboutus")} className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>

                    <CarouselItem className="pl-0">{/* Remove left padding */}
                        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                            <img
                                src={assets.slider2}
                                alt="Quality Machinery Sales"
                                className="w-full h-full object-cover "
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent flex items-center">
                                <div className="text-white px-8 md:px-16 lg:px-24 max-w-2xl">
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                        Quality Machinery Sales
                                    </h2>
                                    <p className="text-lg md:text-xl mb-6">
                                        Browse our extensive collection of refurbished and certified equipment
                                    </p>
                                    <button onClick={() => navigate("/services")} className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
                                        View Inventory
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>

                    <CarouselItem className="pl-0">{/* Remove left padding */}
                        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                            <img
                                src={assets.slider3}
                                alt="Trusted by Industry Leaders"
                                className="w-full h-full object-cover "
                            />
                            <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent  flex items-center">
                                <div className="text-white px-8 md:px-16 lg:px-24 max-w-2xl">
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                        Trusted by Industry Leaders
                                    </h2>
                                    <p className="text-lg md:text-xl mb-6">
                                        Over 20 years of excellence in equipment repair and sales
                                    </p>
                                    <button onClick={() => navigate("/contact")} className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors">
                                        Contact Us
                                    </button>
                                </div>
                            </div>
                        </div>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
            </Carousel>
        </div>
    )
}

export default Slider
