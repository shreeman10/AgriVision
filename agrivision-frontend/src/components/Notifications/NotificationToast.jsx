import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

const NotificationToast = () => {
    const { notifications, removeNotification } = useNotification();

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle size={20} />;
            case 'error':
                return <XCircle size={20} />;
            case 'warning':
                return <AlertTriangle size={20} />;
            case 'info':
            default:
                return <Info size={20} />;
        }
    };

    const getStyles = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            case 'warning':
                return 'bg-yellow-500 text-white';
            case 'info':
            default:
                return 'bg-blue-500 text-white';
        }
    };

    return (
        <div className="fixed top-20 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`${getStyles(notification.type)} rounded-xl shadow-2xl p-4 flex items-center gap-3 min-w-[300px] max-w-md pointer-events-auto animate-slide-in-right`}
                >
                    <div className="flex-shrink-0">
                        {getIcon(notification.type)}
                    </div>
                    <p className="flex-1 text-sm font-medium">{notification.message}</p>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="flex-shrink-0 hover:bg-white/20 rounded-lg p-1 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default NotificationToast;
