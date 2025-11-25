import React, { useState } from 'react';
import DashboardLayout from '../components/Layouts/DashboardLayout';
import StatsCard from '../components/Dashboard/StatsCard';
import RecentDiagnosesTable from '../components/Dashboard/RecentDiagnosesTable';
import StatsModal from '../components/Dashboard/StatsModal';
import { useNavigate } from 'react-router-dom';


const DashboardPage = () => {
    const [selectedStat, setSelectedStat] = useState(null);
    const navigate = useNavigate();

    const stats = [
        {
            title: 'Total Diagnoses',
            value: '1,248',
            icon: '📸',
            color: 'bg-blue-50 text-blue-600',
            trend: { value: '12%', isPositive: true },
            delay: 100,
            type: 'line',
            chartColor: '#2563eb',
            chartData: [20, 45, 30, 60, 55, 85, 100]
        },
        {
            title: 'Healthy Plants',
            value: '856',
            icon: '🌿',
            color: 'bg-green-50 text-green-600',
            trend: { value: '5%', isPositive: true },
            delay: 200,
            type: 'pie',
            chartData: [
                { label: 'Healthy', value: 856, color: '#22c55e' },
                { label: 'At Risk', value: 120, color: '#eab308' }
            ]
        },
        {
            title: 'Diseases Detected',
            value: '392',
            icon: '🦠',
            color: 'bg-red-50 text-red-600',
            trend: { value: '2%', isPositive: false },
            delay: 300,
            type: 'pie',
            chartData: [
                { label: 'Early Blight', value: 150, color: '#ef4444' },
                { label: 'Powdery Mildew', value: 100, color: '#f97316' },
                { label: 'Leaf Spot', value: 80, color: '#8b5cf6' },
                { label: 'Other', value: 62, color: '#64748b' }
            ]
        },
        {
            title: 'Avg. Confidence',
            value: '94.2%',
            icon: '🎯',
            color: 'bg-purple-50 text-purple-600',
            trend: { value: '0.8%', isPositive: true },
            delay: 400,
            type: 'line',
            chartColor: '#9333ea',
            chartData: [88, 90, 92, 91, 94, 93, 95]
        }
    ];

    return (
        <DashboardLayout>
            <StatsModal
                isOpen={!!selectedStat}
                onClose={() => setSelectedStat(null)}
                stat={selectedStat || stats[0]}
            />

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-900">
                    Welcome Back <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500"></span>
                </h1>
                <p className="text-gray-500 mt-2">Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <StatsCard
                        key={index}
                        {...stat}
                        onClick={() => setSelectedStat(stat)}
                    />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Recent Diagnoses Table */}
                <div className="lg:col-span-2">
                    <RecentDiagnosesTable />
                </div>

                {/* Right Column: Quick Actions or Additional Info */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl">
                    <h3 className="text-xl font-bold mb-2">New Diagnosis</h3>
                    <p className="text-gray-400 text-sm mb-6">Upload a photo to check for diseases instantly.</p>
                    <button
                        className="w-full py-3 bg-gradient-to-r from-pink-400 to-yellow-400 rounded-xl text-gray-900 font-bold hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                        onClick={() => navigate('/diagnosis')}
                    >
                        <span></span> Upload Photo
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DashboardPage;
