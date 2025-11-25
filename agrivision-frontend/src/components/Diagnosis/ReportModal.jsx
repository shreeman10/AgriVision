import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ReportModal = ({ result, onClose }) => {
    const reportRef = useRef(null);

    const handleDownloadPDF = async () => {
        const element = reportRef.current;
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`AgriVision_Report_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    if (!result) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-pink-500 to-yellow-500 p-6 text-white flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Diagnosis Report</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Content to be printed */}
                <div ref={reportRef} className="p-8 bg-white">
                    <div className="flex justify-between items-start mb-8 border-b pb-6">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">AgriVision</h1>
                            <p className="text-gray-500">AI-Powered Plant Disease Detection</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <img
                                src={result.image}
                                alt="Analyzed Plant"
                                className="w-full h-64 object-cover rounded-2xl shadow-md border border-gray-100"
                            />
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Disease Detected</p>
                                <p className="text-xl font-bold text-gray-900">{result.disease}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Confidence Score</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-full bg-gray-100 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-pink-500 to-yellow-500 h-3 rounded-full"
                                            style={{ width: `${result.confidence}%` }}
                                        ></div>
                                    </div>
                                    <span className="font-bold">{Math.round(result.confidence)}%</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Severity Status</p>
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold inline-block
                                    ${result.status === 'Healthy' ? 'bg-green-100 text-green-700' :
                                        result.status === 'Critical' || result.status === 'Severe' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'}`}>
                                    {result.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">Treatment Recommendations</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {result.recommendation}
                        </p>
                    </div>

                    <div className="mt-8 text-center text-xs text-gray-400 border-t pt-4">
                        <p>Generated by AgriVision AI • {new Date().toLocaleString()}</p>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 bg-gray-50 border-t flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl font-semibold text-gray-600 hover:bg-gray-200 transition-colors"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleDownloadPDF}
                        className="px-6 py-2.5 rounded-xl font-bold text-gray-900 bg-gradient-to-r from-pink-400 to-yellow-400 hover:opacity-90 shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    >
                        <span>⬇️</span> Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;
