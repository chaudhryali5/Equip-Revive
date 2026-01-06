import React from 'react'
import { assets } from '@/assets/assets'
import { useNavigate } from 'react-router'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Footer = () => {
    const navigate = useNavigate()

    return (
        <footer className="bg-black text-slate-200 pt-16 pb-8">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div onClick={() => navigate('/')} className="inline-block cursor-pointer">
                            <img src={assets.logo1} alt="EquipRevive Logo" className="h-24 w-auto brightness-0 invert" />
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Your trusted partner for industrial equipment repair and maintenance. We bring life back to your machines with expert care and precision.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full bg-slate-900 hover:bg-primary hover:text-white transition-colors duration-300">
                                <FaFacebookF size={18} />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-slate-900 hover:bg-primary hover:text-white transition-colors duration-300">
                                <FaTwitter size={18} />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-slate-900 hover:bg-primary hover:text-white transition-colors duration-300">
                                <FaInstagram size={18} />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-slate-900 hover:bg-primary hover:text-white transition-colors duration-300">
                                <FaLinkedinIn size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-12 after:h-1 after:bg-primary after:rounded-full">
                            Quick Links
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <div onClick={() => navigate('/')} className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Home
                                </div>
                            </li>
                            <li>
                                <div onClick={() => navigate('/services')} className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Services
                                </div>
                            </li>
                            <li>
                                <div onClick={() => navigate('/aboutus')} className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    About Us
                                </div>
                            </li>
                            <li>
                                <div onClick={() => navigate('/contact')} className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 group cursor-pointer">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    Contact
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-12 after:h-1 after:bg-primary after:rounded-full">
                            Contact Us
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 text-slate-400">
                                <FaMapMarkerAlt className="mt-1 text-primary shrink-0" />
                                <p>123 Industrial Park, Tech City, TC 90210</p>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                                <FaPhoneAlt className="text-primary shrink-0" />
                                <p>+1 (555) 123-4567</p>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400">
                                <FaEnvelope className="text-primary shrink-0" />
                                <p>support@equiprevive.com</p>
                            </div>

                            <div className="pt-4">
                                <h4 className="text-sm font-semibold text-white mb-3">Subscribe to our newsletter</h4>
                                <div className="flex gap-2">
                                    <Input
                                        type="email"
                                        placeholder="Email address"
                                        className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-primary"
                                    />
                                    <Button size="icon" className="shrink-0 bg-primary hover:bg-primary/90 text-white">
                                        <FaEnvelope />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-slate-800 my-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} EquipRevive. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
