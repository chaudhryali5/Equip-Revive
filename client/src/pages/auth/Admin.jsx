import toast from "react-hot-toast"
import axios from "axios"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Lock, Mail } from "lucide-react"
import { ADMIN_LOGIN_URL } from "@/assets/api"

const Admin = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

    const handleAdminLogin = async (data) => {
        try {
            const response = await axios.post(ADMIN_LOGIN_URL, data)
            if (response.data.status) {
                localStorage.setItem("adminToken", response.data.token)

                toast.success(response.data.message || "Admin Login Successfully")
                setTimeout(() => {
                    const token = response.data.token
                    window.location.href = `${import.meta.env.VITE_ADMIN_URL}?token=${token}`
                }, 1000)
            } else {
                toast.error(response.data.message || "You are not authorized")
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center px-3 sm:px-6 bg-gray-50/50 dark:bg-gray-900">
            {/* background */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:bg-black dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" />

            <Card className="
                w-[90%]
                xs:w-[85%]
                sm:w-[75%]
                md:w-full
                max-w-md
                shadow-2xl
                backdrop-blur-sm
                border-0
                bg-white/80
                dark:bg-gray-950/80
            ">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight">
                        Admin Portal
                    </CardTitle>
                    <CardDescription className="text-sm sm:text-base">
                        Enter your credentials to access the dashboard
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(handleAdminLogin)} className="space-y-5 sm:space-y-6">
                        {/* Email */}
                        <div className="space-y-2">
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    type="email"
                                    placeholder="admin@example.com"
                                    className="pl-10 h-11"
                                    {...register("email", { required: "Email is required" })}
                                />
                            </div>
                            {errors.email && (
                                <span className="text-sm text-red-500 font-medium ml-1">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 h-11"
                                    {...register("password", { required: "Password is required" })}
                                />
                            </div>
                            {errors.password && (
                                <span className="text-sm text-red-500 font-medium ml-1">
                                    {errors.password.message}
                                </span>
                            )}
                        </div>

                        {/* Button */}
                        <Button
                            type="submit"
                            className="w-full h-11 text-base font-medium shadow-md transition-all hover:scale-[1.02]"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Authenticating..." : "Sign In to Dashboard"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default Admin
