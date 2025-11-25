import React, { useState, useEffect } from 'react';
import { getRecentAnalyses } from '../../services/diagnosisService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const RecentDiagnosesTable = () => {
    const [diagnoses, setDiagnoses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const data = await getRecentAnalyses();
                setDiagnoses(data);
            } catch (error) {
                console.error('Failed to fetch diagnoses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDiagnoses();
    }, []);

    const getStatusColor = (status) => {
        if (!status) return 'bg-gray-100 text-gray-700';
        const lowerStatus = status.toLowerCase();
        if (lowerStatus.includes('healthy') || lowerStatus === 'none') return 'bg-green-100 text-green-700';
        if (lowerStatus.includes('critical') || lowerStatus.includes('severe')) return 'bg-red-100 text-red-700';
        return 'bg-yellow-100 text-yellow-700';
    };

    const formatDate = (dateString) => {
        if (!dateString) return { date: 'N/A', time: '' };
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();

        // Add title
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.text('AgriGuard - Recent Diagnoses Report', 14, 22);

        // Add date
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 30);

        // Prepare table data
        const tableData = diagnoses.map(item => {
            const { date, time } = formatDate(item.created_at);
            const status = item.result?.Severity || 'Unknown';
            return [
                `${date} ${time}`,
                item.disease_name || 'N/A',
                `${Math.round(item.confidence_score)}%`,
                status
            ];
        });

        // Add table
        doc.autoTable({
            startY: 35,
            head: [['Date & Time', 'Disease', 'Confidence', 'Status']],
            body: tableData,
            theme: 'striped',
            headStyles: {
                fillColor: [236, 72, 153], // Pink color
                textColor: 255,
                fontStyle: 'bold'
            },
            styles: {
                fontSize: 10,
                cellPadding: 5
            },
            alternateRowStyles: {
                fillColor: [249, 250, 251]
            }
        });

        // Save the PDF
        doc.save(`AgriGuard_Diagnoses_${new Date().toISOString().split('T')[0]}.pdf`);
    };

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-sm border border-white/50 overflow-hidden animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <div className="p-6 border-b border-gray-100/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-800">Recent Diagnoses</h3>
                    <p className="text-gray-500 text-sm">Latest plant health checks</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-sm w-64"
                        />
                        <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                    </div>
                    <button className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600">
                        ⚙️
                    </button>
                    <button
                        onClick={handleExportPDF}
                        className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800"
                    >
                        Export PDF
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                            <th className="p-6 font-semibold">Image</th>
                            <th className="p-6 font-semibold">Date & Time</th>
                            <th className="p-6 font-semibold">Disease Detected</th>
                            <th className="p-6 font-semibold">Confidence</th>
                            <th className="p-6 font-semibold">Status</th>
                            <th className="p-6 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-500">
                                    Loading recent diagnoses...
                                </td>
                            </tr>
                        ) : diagnoses.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="p-8 text-center text-gray-500">
                                    No diagnoses found. Start by analyzing a plant!
                                </td>
                            </tr>
                        ) : (
                            diagnoses.map((item) => {
                                const { date, time } = formatDate(item.created_at);
                                const status = item.result?.Severity || 'Unknown';

                                return (
                                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-6">
                                            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center text-xs text-gray-500 overflow-hidden">
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt="Plant"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/48?text=IMG' }}
                                                    />
                                                ) : (
                                                    <span>IMG</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <p className="text-sm font-medium text-gray-900">{date}</p>
                                            <p className="text-xs text-gray-500">{time}</p>
                                        </td>
                                        <td className="p-6">
                                            <p className="text-sm font-medium text-gray-900">{item.disease_name}</p>
                                            <p className="text-xs text-gray-500 truncate max-w-[150px]">{item.recommendations}</p>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-pink-400 to-yellow-400"
                                                        style={{ width: `${item.confidence_score}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-medium text-gray-600">{Math.round(item.confidence_score)}%</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(status)}`}>
                                                {status}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                •••
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentDiagnosesTable;
