import React from 'react';
import { FileText } from 'lucide-react';

const ResultsPreview = () => (
    <div className="transform scale-75 origin-top-left pointer-events-none overflow-hidden bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center gap-3 mb-4">
            <FileText className="text-blue-600" size={24} />
            <span className="font-bold text-gray-800">Diagnosis Report</span>
        </div>
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span>Confidence</span>
                <span className="font-bold text-green-600">94%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
            <div className="flex justify-between text-sm">
                <span>Severity</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-semibold">Moderate</span>
            </div>
        </div>
    </div>
);

export default ResultsPreview;
