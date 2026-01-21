import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { assets } from '@/assets/assets';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
// import { LOGIN_URL, GOOGLE_AUTH_URL } from '@/assets/api';
import { StoreContext } from '@/storeContext';
import { useContext } from 'react';

const Login = () => {
    const { setToken } = useContext(StoreContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleUserLogin = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(LOGIN_URL, data);
            if (response.data.status === true) {
                localStorage.setItem("userToken", response.data.token);
                setToken(response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                toast.success(response.data.message || "Welcome back!");
                reset();
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

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (token) => {
            try {
                setIsLoading(true);
                console.log("Token: ", token);
                const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${token.access_token}`,
                    }
                });
                const data = await response.json();
                console.log(data);

                setIsLoading(false);
                toast.success("Login successful!");
                await handleUserLogin({ email: data.email, password: data.given_name });
                navigate('/'); // redirect to dashboard
            } catch (error) {
                setIsLoading(false);
                console.log("Error: ", error);
                toast.error("Network error!");
            }
        }
    });

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
                        <Button onClick={() => handleGoogleLogin()} variant="outline" className="w-full h-11" type="button" disabled={isLoading}>
                            {isLoading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <svg
                                    className="mr-2 h-4 w-4"
                                    viewBox="0 0 48 48"
                                    xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true"
                                    focusable="false"
                                >
                                    <path fill="#EA4335" d="M24 9.5c3.1 0 5.9 1.1 8.1 3.1l6-6C34.5 2.7 29.6 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7 5.4C11.6 13.1 17.3 9.5 24 9.5z" />
                                    <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.8-.4-4H24v7.6h12.7c-.6 3.1-2.4 5.8-5.1 7.6l7.9 6.1c4.6-4.2 6.6-10.4 6.6-17.3z" />
                                    <path fill="#FBBC05" d="M9.7 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7-5.4C.9 17.4 0 20.6 0 24s.9 6.6 2.7 9.4l7-4.7z" />
                                    <path fill="#34A853" d="M24 48c5.6 0 10.5-1.8 14-5l-7.9-6.1c-2.2 1.5-5 2.4-8.1 2.4-6.7 0-12.4-4.6-14.4-10.7l-7 5.4C6.6 42.6 14.6 48 24 48z" />
                                </svg>
                            )}

                            Google
                        </Button>
                        {/* <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => toast.error("Google Sign In was cancelled or failed")}
                            flow="auth-code"
                            theme="outline"
                            size="large"
                            ux_mode="popup"
                        /> */}
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