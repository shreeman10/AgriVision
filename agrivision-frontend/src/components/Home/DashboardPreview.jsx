import React from 'react';
import { BarChart3 } from 'lucide-react';

const DashboardPreview = () => (
    <div className="transform scale-75 origin-top-left pointer-events-none overflow-hidden bg-white rounded-xl shadow-md p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-100 rounded p-2 text-center">
                <BarChart3 className="text-purple-600 mx-auto mb-2" size={32} />
                <p className="font-bold">24</p>
                <p className="text-xs text-gray-500">Scans</p>
            </div>
            <div className="bg-gray-100 rounded p-2 text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                </div>
                <p className="font-bold">18</p>
                <p className="text-xs text-gray-500">Healthy</p>
            </div>
            <div className="bg-gray-100 rounded p-2 text-center">
                <div className="w-8 h-8 bg-red-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-red-600 font-bold">!</span>
                </div>
                <p className="font-bold">6</p>
                <p className="text-xs text-gray-500">Diseased</p>
            </div>
        </div>
        <div className="bg-gray-100 rounded p-4">
            <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold">Recent Activity</span>
                <span className="text-xs text-gray-500">7 days</span>
            </div>
            <div className="h-16 flex gap-1 items-end">
                {[40, 65, 45, 80, 60, 90, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-purple-500 rounded-t" style={{ height: `${h}%` }}></div>
                ))}
            </div>
        </div>
        <div className="bg-gray-100 rounded p-4 mt-4">
            <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold">Recent Diagnoses</span>
                <span className="text-xs text-blue-500">View All</span>
            </div>
            <div className="space-y-2">
                <div className="flex items-center gap-3 bg-white p-2 rounded shadow-sm">
                    <div className="w-8 h-8 bg-gray-200 rounded overflow-hidden">
                        <div className="w-full h-full bg-green-100 flex items-center justify-center text-xs">IMG</div>
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-bold">Tomato Leaf</p>
                        <p className="text-[10px] text-gray-500">Healthy • 98%</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded shadow-sm">
                    <div className="w-8 h-8 bg-gray-200 rounded overflow-hidden">
                        <div className="w-full h-full bg-red-100 flex items-center justify-center text-xs">IMG</div>
                    </div>
                    <div className="flex-1">
                        <p className="text-xs font-bold">Potato Blight</p>
                        <p className="text-[10px] text-gray-500">Critical • 85%</p>
                    </div>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
);

export default DashboardPreview;
