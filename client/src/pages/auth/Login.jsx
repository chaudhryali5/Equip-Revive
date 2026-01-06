import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { assets } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { LOGIN_URL, GOOGLE_AUTH_URL } from '@/assets/api';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleUserLogin = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(LOGIN_URL, data);
            if (response.data.status === true) {
                localStorage.setItem("userToken", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                toast.success(response.data.message || "Welcome back!");
                navigate("/");
            } else {
                toast.error(response.data.message || "Invalid credentials");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        const { code } = credentialResponse;
        if (!code) return toast.error("Google login failed – no code received");

        setIsLoading(true);
        axios.post(GOOGLE_AUTH_URL, { code })
            .then(res => {
                if (res.data.status === true) {
                    localStorage.setItem("userToken", res.data.token);
                    if (res.data.user) {
                        localStorage.setItem("user", JSON.stringify(res.data.user));
                    }
                    toast.success("Logged in with Google!");
                    navigate("/");
                } else {
                    toast.error(res.data.message || "Google login failed");
                }
            })
            .catch(() => toast.error("Google authentication failed"))
            .finally(() => setIsLoading(false));
    };

    return (
        <div className="min-h-screen w-full flex">
            <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-liner-to-br from-violet-600/20 via-black to-blue-600/20" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                <div className="relative z-10  text-center space-y-6 max-w-lg flex flex-col items-center justify-center h-full p-0">
                    <img src={assets.logo1} alt="Logo" className="w-48  drop-shadow-2xl" />
                    <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
                    <p className="text-lg text-gray-400">Access your dashboard and continue your journey.</p>
                </div>
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
            </div>

            <div className="flex-1 flex items-center justify-center p-6 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold">Sign in</h2>
                        <p className="mt-2 text-sm text-muted-foreground">Enter your credentials to access your account</p>
                    </div>

                    <form onSubmit={handleSubmit(handleUserLogin)} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10 h-11"
                                    disabled={isLoading}
                                    autoComplete="email"
                                    {...register("email", { required: "Email is required" })}
                                />
                            </div>
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 h-11"
                                    disabled={isLoading}
                                    autoComplete="current-password"
                                    {...register("password", { required: "Password is required" })}
                                />
                            </div>
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        <Button type="submit" disabled={isLoading} className="w-full h-11">
                            {isLoading ? "Signing in..." : "Sign In"}
                            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => toast.error("Google Sign In was cancelled or failed")}
                            flow="auth-code"
                            theme="outline"
                            size="large"
                            ux_mode="popup"
                        />
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-medium text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;