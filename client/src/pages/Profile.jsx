import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MdVerified, MdEmail, MdPerson, MdLogout, MdOutlineShield, MdGppBad } from 'react-icons/md';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userString = localStorage.getItem("user");
        const token = localStorage.getItem("userToken");
        if (userString && token) {
            try {
                const user = JSON.parse(userString);
                setUser(user);
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem("user");
                localStorage.removeItem("userToken");
                navigate('/login');
            }
        } else {
            toast.error("Please login to continue");
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        // localStorage.removeItem("adminToken");
        // toast.success("Logged out successfully");
        navigate('/');
    };

    const getInitials = (name) => {
        if (!name) return "US";
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatCreatedDate = (dateInput) => {
        if (!dateInput) return "December 2025";
        const date = new Date(dateInput);
        if (isNaN(date.getTime())) return "December 2025";
        return date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <p className="text-muted-foreground animate-pulse">Loading profile...</p>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen w-full bg-muted/30 pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    <Card className="border-none shadow-xl overflow-hidden bg-card ring-1 ring-black/5">

                        <div className="h-48 relative border-b border-border/10">
                            <div className="absolute inset-0 bg-zinc-950">
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-siz-[24px_24px]"></div>
                                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/90 to-transparent"></div>
                                <div className="absolute inset-0 bg-linear-to-br from-black/60 via-gray-900 to-black opacity-80" />
                            </div>
                        </div>

                        <CardContent className="relative px-6 sm:px-12 pb-12">
                            <div className="flex flex-col md:flex-row items-center md:items-end -mt-20 mb-8 gap-8">
                                <Avatar className="h-40 w-40 border-[6px] border-card shadow-2xl ring-1 ring-black/10">
                                    <AvatarImage src={user.image} alt={user.name} className="object-cover" />
                                    <AvatarFallback className="text-5xl font-bold bg-zinc-100 text-zinc-800">
                                        {getInitials(user.name)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 text-center md:text-left space-y-3 pb-2">
                                    <div className="space-y-1">
                                        <h1 className="text-4xl font-bold tracking-tight text-foreground">
                                            {user.name}
                                        </h1>
                                        <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground">
                                            <MdEmail className="w-4 h-4" />
                                            <span className="font-medium">{user.email}</span>
                                            <span className="text-zinc-300">|</span>
                                            {user.isAccountVerified === true || user.isAccountVerified === undefined ? (
                                                <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full text-xs font-semibold ring-1 ring-blue-100">
                                                    <MdVerified className="w-3.5 h-3.5" />
                                                    Verified
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1 text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full text-xs font-semibold ring-1 ring-yellow-100">
                                                    <MdGppBad className="w-3.5 h-3.5" />
                                                    Unverified
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-zinc-50/50 hover:bg-zinc-50 border border-zinc-100 transition-colors flex items-center gap-5">
                                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors ${user.isAccountVerified ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-100' : 'bg-yellow-50 text-yellow-600 ring-1 ring-yellow-100'}`}>
                                        <MdOutlineShield className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-0.5">Account Status</p>
                                        <p className={`font-bold text-lg ${user.isAccountVerified ? 'text-blue-700' : 'text-yellow-700'}`}>
                                            {user.isAccountVerified ? "Verified" : "Unverified"}
                                        </p>
                                    </div>
                                </div>

                                <div className="p-6 rounded-2xl bg-zinc-50/50 hover:bg-zinc-50 border border-zinc-100 transition-colors flex items-center gap-5">
                                    <div className="h-12 w-12 rounded-xl bg-white shadow-sm ring-1 ring-black/5 flex items-center justify-center text-zinc-700">
                                        <MdPerson className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-0.5">Joined</p>
                                        <p className="font-bold text-zinc-900 text-lg">
                                            {formatCreatedDate(user.createdAt)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="bg-zinc-50/80 px-6 py-6 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-4 sm:px-12">
                            <div className="flex items-center gap-2">
                                <div className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </div>
                                <span className="text-sm font-medium text-zinc-600">Online now</span>
                            </div>
                            <Button
                                variant="destructive"
                                onClick={handleLogout}
                                className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border border-red-100 shadow-none font-semibold px-6"
                            >
                                <MdLogout className="mr-2 h-4 w-4" />
                                Sign Out
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;