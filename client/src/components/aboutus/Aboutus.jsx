import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Shield, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);

const Aboutus = () => {
    const navigate = useNavigate()
    const headerRef = useRef(null);
    const storyRef = useRef(null);
    const statsRef = useRef(null);
    const valuesRef = useRef(null);

    useEffect(() => {
       
        gsap.fromTo(headerRef.current.children,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
        );

        gsap.fromTo(storyRef.current,
            { opacity: 0, x: -50 },
            {
                opacity: 1, x: 0, duration: 1, scrollTrigger: {
                    trigger: storyRef.current,
                    start: "top 80%",
                }
            }
        );

        // Stats Animation
        gsap.fromTo(statsRef.current.children,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 85%",
                }
            }
        );

        // Values Animation
        gsap.fromTo(valuesRef.current.children,
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0, duration: 0.8, stagger: 0.15, scrollTrigger: {
                    trigger: valuesRef.current,
                    start: "top 80%",
                }
            }
        );

    }, []);

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-black/80 via-black/80 to-black/80 text-white py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
                <div className="max-w-6xl mx-auto relative z-10 text-center" ref={headerRef}>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        Innovating the Future
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
                        We build digital experiences that inspire, connect, and transform businesses.
                    </p>
                    <button onClick={()=>navigate("/contact")} className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Get in Touch
                    </button>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-12 shadow-md relative z-20 -mt-10 mx-4 md:mx-auto max-w-5xl rounded-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8" ref={statsRef}>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-black mb-2">5+</div>
                        <div className="text-gray-500 font-medium">Years Experience</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-black mb-2">100+</div>
                        <div className="text-gray-500 font-medium">Projects Done</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-black mb-2">50+</div>
                        <div className="text-gray-500 font-medium">Happy Clients</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-black mb-2">24/7</div>
                        <div className="text-gray-500 font-medium">Support</div>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="max-w-6xl mx-auto py-24 px-6 gap-16 md:flex items-center">
                <div className="md:w-1/2 mb-10 md:mb-0" ref={storyRef}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Journey</h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        Started in a small garage in 2020, we have grown into a premier digital agency. Our passion for technology and design drives us to create solutions that not only work but also amaze.
                    </p>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We believe in the power of collaboration and innovation. Every line of code we write and every pixel we design is crafted with precision and care, aiming to exceed expectations.
                    </p>
                </div>
                <div className="md:w-1/2 relative">
                    <div className="absolute inset-0 bg-indigo-200 rounded-3xl transform rotate-3 translate-x-2 translate-y-2"></div>
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1471&q=80"
                        alt="Team Working"
                        className="relative rounded-3xl shadow-2xl w-full object-cover h-80 md:h-96"
                    />
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-gray-900 text-white py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Core Values</h2>
                        <p className="text-gray-400 text-lg">The principles that guide our every step.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10" ref={valuesRef}>
                        <div className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-750 transition-colors border border-gray-700">
                            <div className="w-14 h-14 bg-indigo-500 rounded-xl flex items-center justify-center mb-6">
                                <Target className="text-white w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Excellence</h3>
                            <p className="text-gray-400 leading-relaxed">
                                We never settle for the ordinary. We push boundaries to deliver exceptional results that stand out in the market.
                            </p>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-750 transition-colors border border-gray-700">
                            <div className="w-14 h-14 bg-pink-500 rounded-xl flex items-center justify-center mb-6">
                                <Users className="text-white w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Collaboration</h3>
                            <p className="text-gray-400 leading-relaxed">
                                We believe great things happen when we work together. Our team seamlessly integrates with yours to achieve shared goals.
                            </p>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-2xl hover:bg-gray-750 transition-colors border border-gray-700">
                            <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center mb-6">
                                <Shield className="text-white w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Integrity</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Trust is the foundation of our business. We operate with transparency, honesty, and ethical standards in all we do.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 px-6 text-center">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-black via-black to-purple-600 rounded-3xl p-12 md:p-20 shadow-2xl text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to Start Your Project?</h2>
                    <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                        Let's turn your vision into reality. Contact us today and let's build something amazing together.
                    </p>
                    <button onClick={() => navigate("/contactus")} className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Aboutus;
