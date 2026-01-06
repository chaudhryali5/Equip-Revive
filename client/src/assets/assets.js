import logo1 from "../assets/logo1.png"
import slider1 from "../assets/slider1.avif"
import slider2 from "../assets/slider2.avif"
import slider3 from "../assets/slider3.avif"
import image1 from "../assets/image1.jpg"
import service2 from "../assets/serivce2.jpg"
import service3 from "../assets/service3.jpg"
import service4 from "../assets/service4.jpeg"
import service5 from "../assets/service5.jpg"


export const assets = {
    logo1,
    slider1,
    slider2,
    slider3,
    image1,
    service2,
    service3,
    service4,
    service5
}

export const servicesData = [
    {
        id: 1,
        name: "Smartphone Repair",
        description: "Expert screen replacement, battery checks, and software troubleshooting for all major smartphone brands.",
        category: "Tech",
        priceRange: "$50 - $200",
        image: image1
    },
    {
        id: 2,
        name: "Laptop Diagnostics",
        description: "Comprehensive diagnostics and repair for laptops, including hardware upgrades and virus removal.",
        category: "Tech",
        priceRange: "$80 - $300",
        image: service2
    },
    {
        id: 3,
        name: "Refrigerator Maintenance",
        description: "Keep your food fresh with our professional refrigerator repair and maintenance services.",
        category: "Home Appliances",
        priceRange: "$100 - $400",
        image: service3
    },
    {
        id: 4,
        name: "Washing Machine Fix",
        description: "Quick and reliable repairs for washing machines to get your laundry routine back on track.",
        category: "Home Appliances",
        priceRange: "$90 - $350",
        image: service4
    },
    {
        id: 5,
        name: "Car Engine Tune-up",
        description: "Optimize your vehicle's performance and fuel efficiency with our detailed engine tune-up service.",
        category: "Automobiles",
        priceRange: "$150 - $500",
        image: service5
    },
    {
        id: 6,
        name: "Brake System Check",
        description: "Ensure your safety on the road with our thorough brake system inspection and repair.",
        category: "Automobiles",
        priceRange: "$120 - $450",
        image: image1
    }
];