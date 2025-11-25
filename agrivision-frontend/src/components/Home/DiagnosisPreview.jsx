import React from 'react';
import { Upload } from 'lucide-react';

const DiagnosisPreview = () => (
    <div className="transform scale-75 origin-top-left pointer-events-none overflow-hidden bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center gap-3 mb-4">
            <Upload className="text-green-600" size={24} />
            <span className="font-bold text-gray-800">Upload Leaf Image</span>
        </div>
        <div className="border-2 border-dashed border-gray-300 rounded-lg h-32 flex items-center justify-center text-gray-500">
            Drag & Drop Image Here
        </div>
    </div>
);

export default DiagnosisPreview;
