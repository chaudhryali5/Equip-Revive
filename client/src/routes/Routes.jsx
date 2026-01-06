import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Home from '@/pages/Home'
import Services from '@/pages/Services'
import BookingPage from "@/pages/BookingPage"
import Login from '@/pages/auth/Login'
import Signup from '@/pages/auth/Signup'
import Profile from '@/pages/Profile';
import SmoothScroll from '@/components/SmoothScroll';
import MyBookings from '@/pages/MyBookings';
import Admin from '@/pages/auth/Admin';
import ScrollToTop from '@/components/ScrollToTop';
import { Routes, Route } from 'react-router-dom'

const Router = () => {
    return (
        <BrowserRouter>
            <SmoothScroll>
                <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/aboutus" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/service/:id" element={<BookingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/my-bookings" element={<MyBookings />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </GoogleOAuthProvider>
            </SmoothScroll>
        </BrowserRouter>
    )
}

export default Router
