import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import { assets } from '@/assets/assets';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { REGISTER_URL } from '@/assets/api';

const Signup = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleUserRegister = async (data) => {
        setIsLoading(true);

        try {
            const response = await axios.post(REGISTER_URL, {
                name: data.name.trim(),
                email: data.email.toLowerCase().trim(),
                password: data.password,
            });


            if (response.data.status) {
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                toast.success(response.data.message || 'Account created successfully!');
                reset();
                navigate('/');
            }
            else {
                toast.error(response.data.message || 'Registration failed');
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Network error. Try again.';
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex">
            {/* Left Hero */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-black items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-pink-600/20 via-black to-purple-600/20" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
                <div className="relative z-10 p-12 text-center space-y-6 max-w-lg flex flex-col items-center">
                    <img src={assets.logo1} alt="Logo" className="w-48 drop-shadow-2xl" />
                    <h1 className="text-4xl font-bold text-white">Join Us Today</h1>
                    <p className="text-lg text-gray-400">
                        Create an account to unlock exclusive features.
                    </p>
                </div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
            </div>

            {/* Right Form */}
            <div className="flex-1 flex items-center justify-center p-6 bg-background">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold text-center lg:text-left">Create an account</h2>
                        <p className="mt-2 text-sm text-muted-foreground text-center lg:text-left">
                            Enter your details below
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(handleUserRegister)} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="text-sm font-medium">Full Name</label>
                            <div className="relative mt-1">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="John Doe"
                                    className="pl-10 h-11"
                                    disabled={isLoading}
                                    autoComplete="name"
                                    {...register('name', { required: 'Name is required' })}
                                />
                            </div>
                            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="pl-10 h-11"
                                    disabled={isLoading}
                                    autoComplete="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' },
                                    })}
                                />
                            </div>
                            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-sm font-medium">Password</label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 h-11"
                                    disabled={isLoading}
                                    autoComplete="new-password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Password must be at least 6 characters' },
                                    })}
                                />
                            </div>
                            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                        </div>

                        <Button type="submit" disabled={isLoading} className="w-full h-11">
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;