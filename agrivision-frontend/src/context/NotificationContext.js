import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider');
    }
    return context;
};

// Helper function to format timestamps
const formatTimestamp = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return then.toLocaleDateString();
};

// Mock notifications for testing
const generateMockNotifications = () => {
    const now = Date.now();
    const dayMs = 86400000;
    
    return [
        {
            id: now - 1,
            type: 'success',
            title: 'Welcome to AgriVision!',
            message: 'Your account has been created successfully. Start diagnosing plant diseases now.',
            timestamp: new Date(now - 5 * 60000).toISOString(),
            read: false,
            category: 'account'
        },
        {
            id: now - 2,
            type: 'success',
            title: 'Diagnosis Complete',
            message: 'Late Blight detected with 96% confidence on your tomato plant.',
            timestamp: new Date(now - 2 * 3600000).toISOString(),
            read: false,
            category: 'diagnosis',
            actionLink: '/results'
        },
        {
            id: now - 3,
            type: 'warning',
            title: 'Low Confidence Alert',
            message: 'Recent diagnosis has 65% confidence. Manual review recommended.',
            timestamp: new Date(now - 5 * 3600000).toISOString(),
            read: true,
            category: 'diagnosis'
        },
        {
            id: now - 4,
            type: 'info',
            title: 'Weekly Summary',
            message: '5 scans completed this week. Great progress!',
            timestamp: new Date(now - dayMs).toISOString(),
            read: true,
            category: 'system'
        },
        {
            id: now - 5,
            type: 'success',
            title: 'Diagnosis Complete',
            message: 'Early Blight detected with 94% confidence on your potato plant.',
            timestamp: new Date(now - dayMs - 3600000).toISOString(),
            read: true,
            category: 'diagnosis',
            actionLink: '/results'
        },
        {
            id: now - 6,
            type: 'info',
            title: 'New Feature Available',
            message: 'Check out our new disease database with 50+ plant diseases!',
            timestamp: new Date(now - 2 * dayMs).toISOString(),
            read: false,
            category: 'system',
            actionLink: '/diseases'
        },
        {
            id: now - 7,
            type: 'success',
            title: 'Diagnosis Complete',
            message: 'Stewart\'s Wilt detected with 89% confidence on your corn plant.',
            timestamp: new Date(now - 3 * dayMs).toISOString(),
            read: true,
            category: 'diagnosis'
        },
        {
            id: now - 8,
            type: 'warning',
            title: 'Disease Outbreak Alert',
            message: 'Increased cases of Late Blight reported in your region.',
            timestamp: new Date(now - 4 * dayMs).toISOString(),
            read: true,
            category: 'system'
        },
        {
            id: now - 9,
            type: 'info',
            title: 'Tip of the Day',
            message: 'Take photos in natural light for best diagnosis accuracy.',
            timestamp: new Date(now - 5 * dayMs).toISOString(),
            read: true,
            category: 'system'
        },
        {
            id: now - 10,
            type: 'success',
            title: 'Report Downloaded',
            message: 'Your diagnosis report has been downloaded successfully.',
            timestamp: new Date(now - 6 * dayMs).toISOString(),
            read: true,
            category: 'system'
        }
    ];
};

export const NotificationProvider = ({ children }) => {
    const { currentUser } = useAuth();
    const [notifications, setNotifications] = useState([]);

    // Load notifications from localStorage on mount
    useEffect(() => {
        if (currentUser?.uid) {
            const storageKey = `agriguard_notifications_${currentUser.uid}`;
            const stored = localStorage.getItem(storageKey);
            
            if (stored) {
                try {
                    setNotifications(JSON.parse(stored));
                } catch (error) {
                    console.error('Error loading notifications:', error);
                    // Generate mock notifications if loading fails
                    const mockNotifs = generateMockNotifications();
                    setNotifications(mockNotifs);
                    localStorage.setItem(storageKey, JSON.stringify(mockNotifs));
                }
            } else {
                // First time - generate mock notifications
                const mockNotifs = generateMockNotifications();
                setNotifications(mockNotifs);
                localStorage.setItem(storageKey, JSON.stringify(mockNotifs));
            }
        }
    }, [currentUser]);

    // Save notifications to localStorage whenever they change
    useEffect(() => {
        if (currentUser?.uid && notifications.length > 0) {
            const storageKey = `agriguard_notifications_${currentUser.uid}`;
            localStorage.setItem(storageKey, JSON.stringify(notifications));
        }
    }, [notifications, currentUser]);

    // Toast notification methods
    const showToast = {
        success: (message) => toast.success(message, { duration: 4000, position: 'top-right' }),
        error: (message) => toast.error(message, { duration: 4000, position: 'top-right' }),
        warning: (message) => toast(message, { icon: '⚠️', duration: 4000, position: 'top-right' }),
        info: (message) => toast(message, { icon: 'ℹ️', duration: 4000, position: 'top-right' }),
        loading: (message) => toast.loading(message, { position: 'top-right' }),
        dismiss: (toastId) => toast.dismiss(toastId)
    };

    // Add notification to center
    const addNotification = useCallback((notification) => {
        const newNotification = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            read: false,
            ...notification
        };

        setNotifications(prev => {
            const updated = [newNotification, ...prev];
            // Keep max 50 notifications
            return updated.slice(0, 50);
        });
    }, []);

    // Mark notification as read
    const markAsRead = useCallback((id) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    }, []);

    // Mark all as read
    const markAllAsRead = useCallback(() => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
    }, []);

    // Delete notification
    const deleteNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
    }, []);

    // Clear all notifications
    const clearAll = useCallback(() => {
        setNotifications([]);
    }, []);

    // Get unread count
    const unreadCount = notifications.filter(n => !n.read).length;

    const value = {
        // Toast methods
        ...showToast,
        // Notification center
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        formatTimestamp
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
