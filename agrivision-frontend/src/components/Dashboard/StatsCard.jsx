import React from 'react';

const StatsCard = ({ title, value, icon, trend, color, delay, onClick }) => {
    return (
        <div
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up cursor-pointer"
            style={{ animationDelay: `${delay}ms` }}
            onClick={onClick}
        >
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-gray-500 text-base font-medium mb-2">{title}</p>
                    <h3 className="text-4xl font-extrabold text-gray-800">{value}</h3>
                </div>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${color} shadow-sm`}>
                    {icon}
                </div>
            </div>
            {trend && (
                <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold px-3 py-1.5 rounded-full ${trend.isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {trend.isPositive ? '↑' : '↓'} {trend.value}
                    </span>
                    <span className="text-gray-400 text-sm">vs last month</span>
                </div>
            )}
        </div>
    );
};

export default StatsCard;
