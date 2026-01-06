import { FaTools, FaCogs, FaTruck, FaClipboardCheck } from 'react-icons/fa'
import { assets } from '@/assets/assets'

export const ServicesData = [
    {
        title: "Equipment Repair",
        description: "Full diagnostic and repair services for heavy industrial machinery. We restore your equipment to peak performance.",
        price: "$150 - $500",
        icon: <FaTools className="w-10 h-10 text-primary mb-4" />,
        image: assets.slider1
    },
    {
        title: "Preventive Maintenance",
        description: "Scheduled maintenance plans to prevent breakdowns and extend the lifespan of your valuable assets.",
        price: "$200 - $800",
        icon: <FaCogs className="w-10 h-10 text-primary mb-4" />,
        image: assets.slider2
    },
    {
        title: "Logistics & Delivery",
        description: "Secure transportation and delivery of heavy machinery to your site, ensuring safety and timeliness.",
        price: "$300 - $1200",
        icon: <FaTruck className="w-10 h-10 text-primary mb-4" />,
        image: assets.slider3
    },
    {
        title: "Safety Inspections",
        description: "Comprehensive safety audits and certifications to ensure your machinery meets all regulatory standards.",
        price: "$100 - $300",
        icon: <FaClipboardCheck className="w-10 h-10 text-primary mb-4" />,
        image: assets.slider1 // Reusing slider1 as placeholder
    },
]


