import React, { useState } from 'react';
import {
    Search, Rocket, Camera, Leaf, BarChart3, HelpCircle, Mail,
    MessageSquare, Bug, Lightbulb, MessageCircle, Phone, ChevronDown,
    ChevronUp, Check, X, ExternalLink, Clock, Users
} from 'lucide-react';

const HelpPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedFaq, setExpandedFaq] = useState(null);



    const categories = [
        { id: 'getting-started', icon: Rocket, title: 'Getting Started', desc: 'Learn how to upload your first image and get results', color: 'pink' },
        { id: 'photography', icon: Camera, title: 'Photography Tips', desc: 'Take better leaf photos for accurate diagnosis', color: 'blue' },
        { id: '/diseases', icon: Leaf, title: 'Disease Database', desc: 'Browse 50+ plant diseases we can detect', color: 'green' },
        { id: 'dashboard', icon: BarChart3, title: 'Dashboard Guide', desc: 'Understand your analytics and history', color: 'purple' },
        { id: 'faq', icon: HelpCircle, title: 'FAQs', desc: 'Quick answers to common questions', color: 'orange' },
        { id: 'contact', icon: Mail, title: 'Contact Support', desc: 'Get help from our team', color: 'red' }
    ];

    const faqs = {
        account: [
            {
                q: 'How do I create an account?',
                a: 'Click "Sign Up" in the top right corner, enter your email and password, verify your email (check spam folder), and complete your profile with optional farm details.'
            },
            {
                q: 'Is my data secure and private?',
                a: 'Yes. We use AES-256 encryption for data storage and TLS 1.3 for transmission. We never sell your data to third parties and comply with GDPR regulations.'
            }
        ],
        upload: [
            {
                q: 'What image formats do you accept?',
                a: 'We accept JPG, JPEG, PNG, and WEBP formats with a maximum file size of 5MB per image.'
            },
            {
                q: 'How long does analysis take?',
                a: 'Typically 3-8 seconds depending on server load and image size. Large files may take up to 15 seconds.'
            }
        ],
        diagnosis: [
            {
                q: 'How accurate is the AI model?',
                a: 'Our model achieves 85-98% accuracy depending on disease type and image quality. Accuracy is highest for common diseases like tomato blight (96-98%).'
            },
            {
                q: 'What crops/plants can you detect?',
                a: 'We support 50+ crops including tomato, potato, corn, pepper, wheat, rice, beans, cucumber, and more. See the full list in the Disease Database section.'
            }
        ],
        troubleshooting: [
            {
                q: 'Upload keeps failing - what do I do?',
                a: 'Check: (1) Internet connection, (2) File size <5MB, (3) Accepted format (JPG/PNG), (4) Try a different browser (Chrome/Firefox recommended).'
            },
            {
                q: 'App is very slow',
                a: 'Clear browser cache, close unnecessary tabs, check internet speed (minimum 2Mbps recommended), or try during off-peak hours.'
            }
        ]
    };

    const glossary = [
        { term: 'Blight', def: 'Rapid plant disease causing browning and death of tissues' },
        { term: 'Confidence Score', def: 'AI model\'s certainty percentage (0-100%) for diagnosis accuracy' },
        { term: 'Fungicide', def: 'Chemical that kills or prevents fungal growth on plants' },
        { term: 'Pathogen', def: 'Disease-causing organism such as fungus, bacteria, or virus' },
        { term: 'Severity Level', def: 'Disease impact rating: Mild, Moderate, or Severe' }
    ];

    const toggleFaq = (category, index) => {
        const key = `${category}-${index}`;
        setExpandedFaq(expandedFaq === key ? null : key);
    };

    return (
        <div className="min-h-screen bg-gray-50 relative">
            {/* Background Blobs - Light Pink and Blue Theme */}
            <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
                <div className="absolute top-40 -left-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-40 right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
                <div className="absolute bottom-20 left-40 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-3000"></div>
            </div>

            {/* Hero Section with Search */}
            <section className="relative z-10 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">AgriVision Help Center</h1>
                    <p className="text-xl mb-8 text-white/90">Get instant answers about plant disease detection</p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto mb-6">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search for help... (e.g., 'tomato blight', 'upload error')"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
                        />
                    </div>

                    {/* Quick Stats */}
                    <div className="flex justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <Clock size={16} />
                            <span>150+ articles</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users size={16} />
                            <span>Updated weekly</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MessageCircle size={16} />
                            <span>24/7 support</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Access Cards */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const getColorClasses = (color) => {
                            const colorMap = {
                                pink: 'bg-gradient-to-br from-pink-400 to-pink-600',
                                blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
                                green: 'bg-gradient-to-br from-green-400 to-green-600',
                                purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
                                orange: 'bg-gradient-to-br from-orange-400 to-orange-600',
                                red: 'bg-gradient-to-br from-red-400 to-red-600'
                            };
                            return colorMap[color] || 'bg-gradient-to-br from-gray-400 to-gray-600';
                        };

                        return (
                            <a
                                key={cat.id}
                                href={cat.id.startsWith('/') ? cat.id : `#${cat.id}`}
                                className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-200"
                            >
                                <div className={`w-12 h-12 rounded-xl ${getColorClasses(cat.color)} flex items-center justify-center mb-4`}>
                                    <Icon className="text-white" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{cat.title}</h3>
                                <p className="text-gray-600">{cat.desc}</p>
                            </a>
                        );
                    })}
                </div>
            </section>

            {/* Getting Started Section */}
            <section id="getting-started" className="relative z-10 max-w-5xl mx-auto px-6 py-12">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Rocket className="text-pink-500" size={32} />
                        <h2 className="text-3xl font-bold text-gray-800">Getting Started</h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                title: 'Step 1: Create Your Account',
                                content: ['Click "Sign Up" in the top right', 'Enter email, password, and farm location', 'Verify email (check spam folder)']
                            },
                            {
                                title: 'Step 2: Upload Your First Image',
                                content: ['Click "Start Diagnosis" or navigate to Diagnosis page', 'Drag and drop an image OR click to browse', 'Accepted formats: JPG, PNG, JPEG, WEBP (max 5MB)']
                            },
                            {
                                title: 'Step 3: Review Results',
                                content: ['Wait 3-5 seconds for AI analysis', 'View disease name, confidence score, and severity', 'Download PDF report or save to history']
                            }
                        ].map((step, idx) => (
                            <div key={idx} className="border-l-4 border-pink-500 pl-6 py-2">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                                <ul className="space-y-1">
                                    {step.content.map((item, i) => (
                                        <li key={i} className="text-gray-700 flex items-start gap-2">
                                            <span className="text-pink-500 mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Photography Best Practices */}
            <section id="photography" className="relative z-10 max-w-5xl mx-auto px-6 py-12">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Camera className="text-blue-500" size={32} />
                        <h2 className="text-3xl font-bold text-gray-800">Photography Best Practices</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* DO's */}
                        <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                                <Check size={24} />
                                DO
                            </h3>
                            <ul className="space-y-2">
                                {[
                                    'Take photos in natural daylight',
                                    'Fill 70-80% of frame with the affected leaf',
                                    'Keep camera steady',
                                    'Focus on diseased areas',
                                    'Use clean, dry leaves'
                                ].map((tip, i) => (
                                    <li key={i} className="text-green-700 flex items-start gap-2">
                                        <Camera size={16} className="mt-1 flex-shrink-0 text-green-600" />
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* DON'Ts */}
                        <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                            <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
                                <X size={24} />
                                DON'T
                            </h3>
                            <ul className="space-y-2">
                                {[
                                    'Use flash or artificial lighting',
                                    'Take photos in shadows',
                                    'Include multiple leaves',
                                    'Upload blurry images',
                                    'Photograph wet leaves'
                                ].map((tip, i) => (
                                    <li key={i} className="text-red-700 flex items-start gap-2">
                                        <Camera size={16} className="mt-1 flex-shrink-0 text-red-600" />
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>



            {/* FAQ Section */}
            <section id="faq" className="relative z-10 max-w-5xl mx-auto px-6 py-12">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <HelpCircle className="text-orange-500" size={32} />
                        <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
                    </div>

                    <div className="space-y-6">
                        {Object.entries(faqs).map(([category, questions]) => (
                            <div key={category}>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize border-b-2 border-gray-200 pb-2">
                                    {category.replace('_', ' & ')}
                                </h3>
                                <div className="space-y-3">
                                    {questions.map((faq, idx) => {
                                        const isExpanded = expandedFaq === `${category}-${idx}`;
                                        return (
                                            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                                                <button
                                                    onClick={() => toggleFaq(category, idx)}
                                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                                >
                                                    <span className="font-semibold text-gray-800">{faq.q}</span>
                                                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                                </button>
                                                {isExpanded && (
                                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                                        <p className="text-gray-700">{faq.a}</p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Glossary */}
            <section id="glossary" className="relative z-10 max-w-5xl mx-auto px-6 py-12">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Disease Glossary</h2>
                    <p className="text-gray-600 mb-6">
                        Common agricultural and technical terms used in plant disease diagnosis.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        {glossary.map((item, idx) => (
                            <div key={idx} className="border-l-4 border-green-500 pl-4 py-2">
                                <h4 className="font-bold text-gray-800">{item.term}</h4>
                                <p className="text-gray-600 text-sm">{item.def}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact & Support */}
            <section id="contact" className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Mail className="text-red-500" size={32} />
                        <h2 className="text-3xl font-bold text-gray-800">Contact & Support</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: MessageSquare, title: 'Community Forum', desc: 'Ask questions and share experiences', action: 'Visit Forum', color: 'blue' },
                            { icon: Bug, title: 'Report a Bug', desc: 'Help us improve AgriVision', action: 'Submit Issue', color: 'red' },
                            { icon: Lightbulb, title: 'Request Feature', desc: 'Suggest new functionality', action: 'Share Idea', color: 'yellow' },
                            { icon: Mail, title: 'Email Support', desc: 'support@agriguard.com', action: '24-48 hrs response', color: 'green' },
                            { icon: MessageCircle, title: 'Live Chat', desc: 'Mon-Fri, 9 AM - 5 PM EST', action: 'Start Chat', color: 'purple' },
                            { icon: Phone, title: 'Emergency Hotline', desc: '+1-800-AGRI-HELP', action: 'For critical crop issues', color: 'orange' }
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                                    <Icon className={`text-${item.color}-500 mb-3`} size={32} />
                                    <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        {item.action}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Social Media */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="font-bold text-gray-800 mb-4">Follow Us</h3>
                        <div className="flex flex-wrap gap-4">
                            {[
                                { name: 'Twitter', handle: '@AgriVision' },
                                { name: 'Facebook', handle: '/AgriVision' },
                                { name: 'YouTube', handle: '/AgriVision' },
                                { name: 'Discord', handle: 'Community Server' }
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href="#!"
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    <ExternalLink size={16} />
                                    <span className="font-medium text-gray-700">{social.name}</span>
                                    <span className="text-gray-500 text-sm">{social.handle}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Back to Top */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 pb-12">
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="w-full py-4 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                >
                    Back to Top
                </button>
            </div>
        </div>
    );
};

export default HelpPage;
