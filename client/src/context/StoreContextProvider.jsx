import { SERIVCE_LIST_URL } from "@/assets/api"
import { StoreContext } from "@/storeContext"
import axios from "axios"
import { useEffect, useState } from "react"

const StoreContextProvider = ({ children }) => {

    const [service, setService] = useState([])
    const [token, setToken] = useState()

    const fetchServices = async () => {
        try {
            const res = await axios.get(SERIVCE_LIST_URL)
            if (res.data.status && res.data.services) {
                setService(res.data.services)
            }
        } catch (error) {
            console.error("Error fetching services:", error)
            setService([])
        }
    }


    useEffect(() => {
         fetchServices()
        if (localStorage.getItem("userToken")) {
            setToken(localStorage.getItem("userToken"))
        }
    }, [])

    return (
        <StoreContext.Provider value={{ service, token }}>
            {children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider
