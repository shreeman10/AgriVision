import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { User, Mail, Save, Camera, Bell, CheckSquare, Square, Info } from 'lucide-react';

const ProfilePage = () => {
    const { currentUser } = useAuth();
    const { success } = useNotification();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: currentUser?.displayName || 'John Doe',
        email: currentUser?.email || 'user@example.com',
        phone: '+1 234 567 8900',
        location: 'California, USA'
    });

    // Email notification preferences
    const [emailPrefs, setEmailPrefs] = useState({
        enabled: false,
        diagnosisComplete: true,
        lowConfidence: true,
        weeklySummary: false,
        diseaseOutbreak: false
    });

    // Load email preferences from localStorage
    useEffect(() => {
        if (currentUser?.uid) {
            const storageKey = `agriguard_email_prefs_${currentUser.uid}`;
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                try {
                    setEmailPrefs(JSON.parse(stored));
                } catch (error) {
                    console.error('Error loading email preferences:', error);
                }
            }
        }
    }, [currentUser]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleEmailPrefChange = (key, value) => {
        const newPrefs = {
            ...emailPrefs,
            [key]: value
        };
        setEmailPrefs(newPrefs);
    };

    const handleSaveEmailPrefs = () => {
        if (currentUser?.uid) {
            const storageKey = `agriguard_email_prefs_${currentUser.uid}`;
            localStorage.setItem(storageKey, JSON.stringify(emailPrefs));
            success('Email preferences saved successfully!');
        }
    };

    const handleSaveProfile = () => {
        setTimeout(() => {
            success('Profile updated successfully!');
            setIsEditing(false);
        }, 500);
    };

    const handleCancelEdit = () => {
        setFormData({
            name: currentUser?.displayName || 'John Doe',
            email: currentUser?.email || 'user@example.com',
            phone: '+1 234 567 8900',
            location: 'California, USA'
        });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 -left-20 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-40 right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto p-6 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile & Settings</h1>
                    <p className="text-gray-600">Manage your account information and preferences</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
                            <div className="relative inline-block mb-4">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white text-4xl font-bold">
                                    {formData.name.charAt(0).toUpperCase()}
                                </div>
                                <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors">
                                    <Camera size={20} className="text-gray-700" />
                                </button>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{formData.name}</h2>
                            <p className="text-gray-500 mb-6">{formData.email}</p>

                            <div className="space-y-3 text-left">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Mail size={18} />
                                    <span className="text-sm">{formData.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <User size={18} />
                                    <span className="text-sm">{formData.location}</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">24</p>
                                        <p className="text-sm text-gray-500">Diagnoses</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">18</p>
                                        <p className="text-sm text-gray-500">Saved</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl shadow-lg p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">Account Information</h3>
                                {!isEditing ? (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-opacity"
                                    >
                                        Edit Profile
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleCancelEdit}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSaveProfile}
                                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2"
                                        >
                                            <Save size={18} />
                                            Save
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:bg-gray-50 disabled:text-gray-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Email Notification Preferences */}
                        <div className="bg-white rounded-3xl shadow-lg p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <Bell className="text-blue-600" size={20} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">Email Notifications</h3>
                                    <p className="text-sm text-gray-500">Manage your email notification preferences</p>
                                </div>
                            </div>

                            {/* Main Toggle */}
                            <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6">
                                <div>
                                    <p className="font-semibold text-gray-900">Enable Email Notifications</p>
                                    <p className="text-sm text-gray-500">Receive updates via email</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={emailPrefs.enabled}
                                        onChange={(e) => handleEmailPrefChange('enabled', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-blue-600"></div>
                                </label>
                            </div>

                            {/* Notification Types */}
                            {emailPrefs.enabled && (
                                <div className="space-y-4 mb-6">
                                    <p className="text-sm font-semibold text-gray-700 mb-3">Notification Types</p>

                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div onClick={() => handleEmailPrefChange('diagnosisComplete', !emailPrefs.diagnosisComplete)}>
                                            {emailPrefs.diagnosisComplete ? (
                                                <CheckSquare size={20} className="text-blue-600" />
                                            ) : (
                                                <Square size={20} className="text-gray-400 group-hover:text-gray-600" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">Diagnosis Complete</p>
                                            <p className="text-xs text-gray-500">Get notified when your plant diagnosis is ready</p>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div onClick={() => handleEmailPrefChange('lowConfidence', !emailPrefs.lowConfidence)}>
                                            {emailPrefs.lowConfidence ? (
                                                <CheckSquare size={20} className="text-blue-600" />
                                            ) : (
                                                <Square size={20} className="text-gray-400 group-hover:text-gray-600" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">Low Confidence Alert (&lt;70%)</p>
                                            <p className="text-xs text-gray-500">Receive alerts for diagnoses requiring manual review</p>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div onClick={() => handleEmailPrefChange('weeklySummary', !emailPrefs.weeklySummary)}>
                                            {emailPrefs.weeklySummary ? (
                                                <CheckSquare size={20} className="text-blue-600" />
                                            ) : (
                                                <Square size={20} className="text-gray-400 group-hover:text-gray-600" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">Weekly Summary</p>
                                            <p className="text-xs text-gray-500">Get a weekly summary of your diagnoses and insights</p>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div onClick={() => handleEmailPrefChange('diseaseOutbreak', !emailPrefs.diseaseOutbreak)}>
                                            {emailPrefs.diseaseOutbreak ? (
                                                <CheckSquare size={20} className="text-blue-600" />
                                            ) : (
                                                <Square size={20} className="text-gray-400 group-hover:text-gray-600" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">Disease Outbreak Alerts</p>
                                            <p className="text-xs text-gray-500">Stay informed about disease outbreaks in your region</p>
                                        </div>
                                    </label>
                                </div>
                            )}

                            {/* Mock Email Preview */}
                            {emailPrefs.enabled && (
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-6">
                                    <p className="text-xs font-semibold text-gray-500 mb-3">EMAIL PREVIEW</p>
                                    <div className="bg-white rounded-lg p-4 shadow-sm">
                                        <p className="text-sm font-bold text-gray-900 mb-3">🌱 AgriGuard - Diagnosis Complete</p>
                                        <div className="space-y-2 text-xs">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Disease:</span>
                                                <span className="font-semibold text-gray-900">Early Blight</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Confidence:</span>
                                                <span className="font-semibold text-green-600">94%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Severity:</span>
                                                <span className="font-semibold text-yellow-600">Moderate</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Crop:</span>
                                                <span className="font-semibold text-gray-900">Tomato</span>
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-3 pb-3 border-b border-gray-200">
                                            Your tomato shows Early Blight. Remove infected leaves, apply copper fungicide.
                                        </p>
                                        <button className="mt-3 w-full py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-semibold rounded-lg">
                                            View Full Report
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Info Banner */}
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4 flex items-start gap-3">
                                <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm font-semibold text-blue-900">Coming Soon</p>
                                    <p className="text-xs text-blue-700 mt-1">
                                        Email notifications will activate after AI model deployment. Your preferences are saved and will be applied automatically.
                                    </p>
                                </div>
                            </div>

                            {/* Save Button */}
                            <button
                                onClick={handleSaveEmailPrefs}
                                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                <Save size={18} />
                                Save Email Preferences
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
