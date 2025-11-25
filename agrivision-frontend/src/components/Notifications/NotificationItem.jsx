import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';

const NotificationItem = ({ notification, compact = false }) => {
    const navigate = useNavigate();
    const { markAsRead, deleteNotification, formatTimestamp } = useNotification();

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircle size={20} className="text-green-600" />;
            case 'error':
                return <XCircle size={20} className="text-red-600" />;
            case 'warning':
                return <AlertTriangle size={20} className="text-yellow-600" />;
            case 'info':
            default:
                return <Info size={20} className="text-blue-600" />;
        }
    };

    const getBgColor = (type) => {
        if (notification.read) return 'bg-white';

        switch (type) {
            case 'success':
                return 'bg-green-50';
            case 'error':
                return 'bg-red-50';
            case 'warning':
                return 'bg-yellow-50';
            case 'info':
            default:
                return 'bg-blue-50';
        }
    };

    const getBorderColor = (type) => {
        if (notification.read) return '';

        switch (type) {
            case 'success':
                return 'border-l-4 border-green-500';
            case 'error':
                return 'border-l-4 border-red-500';
            case 'warning':
                return 'border-l-4 border-yellow-500';
            case 'info':
            default:
                return 'border-l-4 border-blue-500';
        }
    };

    const handleClick = () => {
        if (!notification.read) {
            markAsRead(notification.id);
        }
        if (notification.actionLink) {
            navigate(notification.actionLink);
        }
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        deleteNotification(notification.id);
    };

    return (
        <div
            onClick={handleClick}
            className={`
                ${getBgColor(notification.type)} 
                ${getBorderColor(notification.type)}
                ${compact ? 'p-3' : 'p-4'}
                ${notification.actionLink ? 'cursor-pointer' : ''}
                hover:bg-gray-50 transition-colors rounded-lg relative group
            `}
        >
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                    {getIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <h4 className={`${compact ? 'text-sm' : 'text-base'} font-semibold text-gray-900`}>
                            {notification.title}
                        </h4>
                        <button
                            onClick={handleDelete}
                            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                        >
                            <X size={14} className="text-gray-500" />
                        </button>
                    </div>

                    <p className={`${compact ? 'text-xs' : 'text-sm'} text-gray-600 mt-1`}>
                        {notification.message}
                    </p>

                    <p className="text-xs text-gray-400 mt-2">
                        {formatTimestamp(notification.timestamp)}
                    </p>
                </div>
            </div>

            {!notification.read && (
                <div className="absolute top-3 right-3 w-2 h-2 bg-blue-600 rounded-full"></div>
            )}
        </div>
    );
};

export default NotificationItem;
