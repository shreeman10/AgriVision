import React from 'react';
import { HelpCircle, Upload } from 'lucide-react';

const HelpPreview = () => (
    <div className="transform scale-75 origin-top-left pointer-events-none overflow-hidden bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="text-orange-600" size={24} />
            <span className="font-bold text-gray-800">Help Center</span>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Getting Started</li>
            <li>Photography Tips</li>
            <li>FAQs</li>
        </ul>
    </div>
);

export default HelpPreview;
