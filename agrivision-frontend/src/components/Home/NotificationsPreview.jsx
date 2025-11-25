import React from 'react';
import { Bell } from 'lucide-react';

const NotificationsPreview = () => (
    <div className="transform scale-75 origin-top-left pointer-events-none overflow-hidden bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center gap-3 mb-4">
            <Bell className="text-yellow-600" size={24} />
            <span className="font-bold text-gray-800">Notifications</span>
        </div>
        <ul className="space-y-2 text-sm text-gray-600">
            <li>✅ Diagnosis Complete – Early Blight (94%)</li>
            <li>🔔 New Feature – Disease Database</li>
            <li>⚠ Low Confidence Alert – Review needed</li>
        </ul>
    </div>
);

export default NotificationsPreview;
