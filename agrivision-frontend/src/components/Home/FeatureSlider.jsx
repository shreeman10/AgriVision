import React, { useState, useEffect } from 'react';
import { ChevronRight, ArrowRight, Upload, FileText, BarChart3, HelpCircle, User, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';


const FeatureSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const features = [
        {
            title: 'Diagnosis',
            description: 'Upload leaf images for instant AI disease detection',
            link: '/diagnosis',
            icon: Upload,
            gradient: 'from-green-400 to-emerald-600',
            image: '/screenshots/diagnosis.png'
        },
        {
            title: 'Results',
            description: 'Get detailed disease reports with treatment recommendations',
            link: '/results',
            icon: FileText,
            gradient: 'from-blue-400 to-indigo-600',
            image: '/screenshots/results.png'
        },
        {
            title: 'Dashboard',
            description: 'Track your diagnosis history and analytics',
            link: '/dashboard',
            icon: BarChart3,
            gradient: 'from-purple-400 to-pink-600',
            image: '/screenshots/dashboard.png'
        },
        {
            title: 'Help Center',
            description: 'Access guides, FAQs, and photography tips',
            link: '/help',
            icon: HelpCircle,
            gradient: 'from-orange-400 to-red-600',
            image: '/screenshots/help.png'
        },
        {
            title: 'Profile & Settings',
            description: 'Manage your account and notification preferences',
            link: '/profile',
            icon: User,
            gradient: 'from-cyan-400 to-blue-600',
            image: '/screenshots/settings.png'
        },
        {
            title: 'Notifications',
            description: 'Stay updated with diagnosis results and alerts',
            link: '/notifications',
            icon: Bell,
            gradient: 'from-yellow-400 to-orange-600',
            image: '/screenshots/notifications.png'
        }
    ];

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(() => {
                setCurrentSlide(prev => (prev + 1) % features.length);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isPaused, features.length]);

    const goToSlide = index => setCurrentSlide(index);
    const goToNext = () => setCurrentSlide(prev => (prev + 1) % features.length);

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-96 h-96 bg-green-300 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore AgriGuard Features</h2>
                    <p className="text-lg text-gray-600">Discover all the powerful tools at your fingertips</p>
                </div>

                <div
                    className="relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Slider Content without browser chrome */}
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                        <div className="relative w-full overflow-hidden">
                            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                                {features.map((feat, idx) => (
                                    <div key={idx} className="relative w-full flex-shrink-0 aspect-video bg-gradient-to-br from-gray-100 to-gray-200">
                                        <img src={feat.image} alt={`${feat.title} page screenshot`} className="w-full h-full object-cover" />
                                        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${feat.gradient} p-6 text-white`}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-2xl font-bold mb-2">{feat.title}</h3>
                                                    <p className="text-white/90">{feat.description}</p>
                                                </div>
                                                <Link
                                                    to={feat.link}
                                                    className="px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 whitespace-nowrap"
                                                >
                                                    Explore
                                                    <ArrowRight size={18} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Arrows */}

                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
                        aria-label="Next slide"
                    >
                        <ChevronRight size={24} className="text-gray-700" />
                    </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-3 mt-8">
                    {features.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className={`transition-all ${idx === currentSlide ? 'w-12 h-3 bg-gradient-to-r from-green-500 to-blue-500' : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'} rounded-full`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSlider;
