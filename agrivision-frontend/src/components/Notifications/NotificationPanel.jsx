import React from 'react';
import { CheckCheck, Trash2 } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import NotificationItem from './NotificationItem';

const NotificationPanel = ({ isOpen, onClose }) => {
    const { notifications, unreadCount, markAllAsRead, clearAll } = useNotification();

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="absolute right-0 mt-2 w-full sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-[500px] flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                            <p className="text-xs text-gray-500">{unreadCount} unread</p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {notifications.length > 0 && (
                            <>
                                <button
                                    onClick={markAllAsRead}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Mark all as read"
                                >
                                    <CheckCheck size={18} className="text-gray-600" />
                                </button>
                                <button
                                    onClick={clearAll}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Clear all"
                                >
                                    <Trash2 size={18} className="text-gray-600" />
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Notifications List */}
                <div className="overflow-y-auto flex-1">
                    {notifications.length === 0 ? (
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <p className="text-gray-500 font-medium">No notifications</p>
                            <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
                        </div>
                    ) : (
                        <div className="p-2 space-y-2">
                            {notifications.map((notification) => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    compact={true}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-200 text-center">
                        <a
                            href="/notifications"
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            onClick={onClose}
                        >
                            View all notifications
                        </a>
                    </div>
                )}
            </div>
        </>
    );
};

export default NotificationPanel;
