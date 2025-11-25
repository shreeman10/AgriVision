import React from 'react';
import FeatureSlider from '../components/Home/FeatureSlider';
import DashboardPreview from '../components/Home/DashboardPreview';

const HomePage = () => {
    return (
        <div className="min-h-full">
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Headline + CTA */}
                    <div className="space-y-8">
                        <div className="inline-block rounded-full glass px-4 py-2 text-sm font-medium text-gray-700">
                            Introducing AI-powered plant health insights
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900 tracking-tight">
                            The Complete <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                                Plant Diagnosis
                            </span>
                            <br /> Platform
                        </h1>

                        <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
                            From detection to treatment, AgriVision brings every part of your crop management into one organized, intelligent space.
                        </p>

                        <div className="flex items-center gap-4 pt-4">
                            <a
                                href="/diagnosis"
                                className="inline-flex items-center justify-center rounded-full px-8 py-4 bg-gray-900 text-white font-bold text-lg shadow-xl hover:bg-gray-800 transition-transform hover:scale-105"
                            >
                                Get Started
                            </a>

                            <a href="/help" className="inline-flex items-center justify-center rounded-full px-8 py-4 glass text-gray-800 font-semibold hover:bg-white/40 transition-colors">
                                Learn more
                            </a>
                        </div>

                        <div className="pt-12">
                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Trusted by farmers worldwide</p>
                            <div className="flex flex-wrap gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                                {/* Placeholder Logos using glass chips for now */}
                                {['AgriTech', 'FarmCo', 'GreenGrow', 'NatureFirst'].map((brand) => (
                                    <div key={brand} className="glass px-4 py-2 rounded-lg font-bold text-gray-600">
                                        {brand}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Hero image / screenshot placeholder */}
                    <div className="relative">
                        {/* Decorative blobs behind the card */}
                        <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                        <div className="absolute -bottom-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                        <div className="relative glass-card p-2 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                            <div className="bg-white/50 rounded-xl overflow-hidden shadow-inner">
                                <div className="h-8 bg-white/40 border-b border-white/20 flex items-center px-4 gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                </div>
                                <div className="p-4">
                                    <DashboardPreview />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Slider Section */}
            <FeatureSlider />
        </div>
    );
};

export default HomePage;
