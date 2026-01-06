import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { CONTACT_URL } from '@/assets/api';
import gsap from 'gsap';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const containerRef = useRef(null);
    const formRef = useRef(null);
    const infoRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            gsap.from('.contact-header', {
                opacity: 0,
                y: -30,
                duration: 0.8,
                ease: 'power3.out'
            });

            // Form card animation
            gsap.from(formRef.current, {
                opacity: 0,
                x: -50,
                duration: 0.8,
                delay: 0.2,
                ease: 'power3.out'
            });

            // Info cards animation
            gsap.from('.info-card', {
                opacity: 0,
                x: 50,
                duration: 0.8,
                delay: 0.3,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(CONTACT_URL, formData);

            if (response.data.success) {
                toast.success('Message sent successfully! We\'ll get back to you soon.', {
                    duration: 4000,
                    icon: <Check className="w-5 h-5" />
                });
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            } else {
                toast.error(response.data.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            toast.error('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-muted/30 to-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto w-[90%]">
                {/* Header */}
                <div className="contact-header text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
                        Get In Touch
                    </h1>
                    <p className="text-base text-muted-foreground max-w-xl mx-auto">
                        Have a question or need assistance? We're here to help. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    {/* Contact Form */}
                    <div ref={formRef} className="lg:col-span-2">
                        <Card className="border-none shadow-xl bg-card">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-bold">Send Us a Message</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Name Input */}
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-foreground">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={handleChange}
                                                disabled={loading}
                                                className="h-10"
                                            />
                                        </div>

                                        {/* Email Input */}
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-foreground">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                disabled={loading}
                                                className="h-10"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone Input */}
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-foreground">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            disabled={loading}
                                            className="h-10"
                                        />
                                    </div>

                                    {/* Message Textarea */}
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-foreground">
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us how we can help you..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            disabled={loading}
                                            rows={4}
                                            className="resize-none"
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-11 text-base font-semibold"
                                        size="lg"
                                    >
                                        {loading ? (
                                            <>Sending...</>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-5 w-5" />
                                                Send Message
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Information Cards */}
                    <div ref={infoRef} className="space-y-4">
                        {/* Email Card */}
                        <Card className="info-card border-none shadow-lg bg-card hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-5">
                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Mail className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Email</h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Send us an email anytime
                                        </p>
                                        <a
                                            href="mailto:support@equiprevive.com"
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            support@equiprevive.com
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Phone Card */}
                        <Card className="info-card border-none shadow-lg bg-card hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-5">
                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Phone className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Call us during business hours
                                        </p>
                                        <a
                                            href="tel:+15550000000"
                                            className="text-sm font-medium text-primary hover:underline"
                                        >
                                            +1 (555) 000-0000
                                        </a>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Location Card */}
                        <Card className="info-card border-none shadow-lg bg-card hover:shadow-xl transition-shadow duration-300">
                            <CardContent className="p-5">
                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">Location</h3>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Visit us at our office
                                        </p>
                                        <p className="text-sm font-medium text-primary">
                                            123 Main Street<br />
                                            City, State 12345
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Business Hours Card */}
                        <Card className="info-card border-none shadow-lg bg-gradient-to-br from-primary/10 to-primary/5">
                            <CardContent className="p-5">
                                <h3 className="font-semibold text-foreground mb-3">Business Hours</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Monday - Friday</span>
                                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Saturday</span>
                                        <span className="font-medium">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Sunday</span>
                                        <span className="font-medium">Closed</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;