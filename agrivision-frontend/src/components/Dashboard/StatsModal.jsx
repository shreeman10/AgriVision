import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const StatsModal = ({ isOpen, onClose, stat }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setAnimate(true), 50);
        } else {
            setAnimate(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const lineOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                }
            },
            x: {
                grid: {
                    display: false,
                }
            }
        },
        elements: {
            line: {
                tension: 0.4, // Smooth curves
            }
        }
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
    };

    const getChartData = () => {
        if (stat.type === 'line') {
            return {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: stat.title,
                        data: stat.chartData,
                        borderColor: stat.chartColor,
                        backgroundColor: stat.chartColor,
                        borderWidth: 3,
                        pointRadius: 4,
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 2,
                    },
                ],
            };
        } else if (stat.type === 'pie') {
            return {
                labels: stat.chartData.map(d => d.label),
                datasets: [
                    {
                        data: stat.chartData.map(d => d.value),
                        backgroundColor: stat.chartData.map(d => d.color),
                        borderWidth: 0,
                    },
                ],
            };
        }
        return null;
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${animate ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div
                className={`bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl relative z-10 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${animate ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10'}`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    ✕
                </button>

                <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${stat.color} bg-opacity-10`}>
                        {stat.icon}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{stat.title} Analytics</h2>
                        <p className="text-gray-500">Detailed breakdown for this month</p>
                    </div>
                </div>

                <div className="h-64 w-full mt-8 flex items-center justify-center bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    {stat.type === 'line' && (
                        <Line options={lineOptions} data={getChartData()} />
                    )}
                    {stat.type === 'pie' && (
                        <div className="w-64 h-64">
                            <Pie options={pieOptions} data={getChartData()} />
                        </div>
                    )}
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Weekly Avg</p>
                        <p className="text-lg font-bold text-gray-800 mt-1">+12%</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Best Day</p>
                        <p className="text-lg font-bold text-gray-800 mt-1">Friday</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Projection</p>
                        <p className="text-lg font-bold text-gray-800 mt-1">Growing</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsModal;
