import React, { useState } from 'react';
import DashboardLayout from '../components/Layouts/DashboardLayout';
import ImageUpload from '../components/Diagnosis/ImageUpload';
import ReportModal from '../components/Diagnosis/ReportModal';

const DiagnosisPage = () => {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showReport, setShowReport] = useState(false);

    const handleAnalyze = async (file) => {
        setLoading(true);
        setError(null);

        try {
            // Create FormData to send image to backend
            const formData = new FormData();
            formData.append('image', file);

            // Call Django backend API
            const response = await fetch('http://localhost:8000/api/analysis/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to analyze image');
            }

            const data = await response.json();

            // Map backend response to frontend format
            const mappedResult = {
                disease: data.disease_name,
                confidence: data.confidence_score,
                status: data.result?.Severity || 'Unknown',
                recommendation: data.recommendations,
                image: URL.createObjectURL(file),
                gradcam: data.result?.GradCAM ? `http://localhost:8000/media/${data.result.GradCAM}` : null
            };

            setResult(mappedResult);
            setShowReport(true);
        } catch (err) {
            setError(err.message || 'Failed to analyze image. Please try again.');
            console.error('Analysis error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setShowReport(false);
    };

    return (
        <DashboardLayout>
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    AI Plant <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Diagnosis</span>
                </h1>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                    Upload a photo of your plant to instantly detect diseases and get treatment recommendations.
                </p>
            </div>

            {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 animate-fade-in-up">
                    <p className="font-semibold">Error</p>
                    <p>{error}</p>
                </div>
            )}

            {loading ? (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-12 shadow-sm border border-white/50 animate-fade-in-up text-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-600 font-semibold">Analyzing your plant...</p>
                        <p className="text-gray-500 text-sm">This may take a few seconds</p>
                    </div>
                </div>
            ) : !result ? (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white/50 animate-fade-in-up">
                    <ImageUpload onAnalyze={handleAnalyze} />
                </div>
            ) : (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-sm border border-white/50 animate-fade-in-up">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <img
                                src={result.image}
                                alt="Analyzed Plant"
                                className="w-full h-80 object-cover rounded-2xl shadow-md"
                            />
                        </div>
                        <div className="space-y-6">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">Disease Detected</p>
                                <p className="text-3xl font-bold text-gray-900">{result.disease}</p>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-2">Confidence Score</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-full bg-gray-100 rounded-full h-4">
                                        <div
                                            className="bg-gradient-to-r from-pink-500 to-yellow-500 h-4 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${result.confidence}%` }}
                                        ></div>
                                    </div>
                                    <span className="font-bold text-lg">{Math.round(result.confidence)}%</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-2">Severity Status</p>
                                <span className={`px-4 py-2 rounded-xl text-sm font-bold inline-block
                                    ${result.status === 'Healthy' ? 'bg-green-100 text-green-700' :
                                        result.status === 'Critical' || result.status === 'Severe' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'}`}>
                                    {result.status}
                                </span>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-2">Recommendation</h3>
                                <p className="text-gray-600">{result.recommendation}</p>
                            </div>

                            <div className="flex gap-4 mt-8">
                                <button
                                    onClick={handleReset}
                                    className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Analyze Another
                                </button>
                                <button
                                    onClick={() => setShowReport(true)}
                                    className="flex-1 py-3 rounded-xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-colors"
                                >
                                    Save Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Report Modal */}
            {showReport && (
                <ReportModal
                    result={result}
                    onClose={() => setShowReport(false)}
                />
            )}
        </DashboardLayout>
    );
};

export default DiagnosisPage;
