import React from 'react';
import { User } from 'lucide-react';

const ProfilePreview = () => (
    <div className="transform scale-75 origin-top-left pointer-events-none overflow-hidden bg-white rounded-xl shadow-md p-4">
        <div className="flex items-center gap-3 mb-4">
            <User className="text-cyan-600" size={24} />
            <span className="font-bold text-gray-800">User Settings</span>
        </div>
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span>Email Notifications</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">On</span>
            </div>
            <div className="flex justify-between text-sm">
                <span>Push Notifications</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded">Off</span>
            </div>
        </div>
    </div>
);

export default ProfilePreview;
