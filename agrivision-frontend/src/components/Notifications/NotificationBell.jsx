import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import NotificationPanel from './NotificationPanel';

const NotificationBell = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { unreadCount } = useNotification();
    const bellRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (bellRef.current && !bellRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative" ref={bellRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <Bell
                    size={22}
                    className={`text-gray-700 ${unreadCount > 0 ? 'animate-pulse' : ''}`}
                />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            <NotificationPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
    );
};

export default NotificationBell;
