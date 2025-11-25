import React, { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import NotificationItem from '../components/Notifications/NotificationItem';

const NotificationPage = () => {
    const { notifications } = useNotification();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const filters = [
        { id: 'all', label: 'All' },
        { id: 'unread', label: 'Unread' },
        { id: 'diagnosis', label: 'Diagnosis' },
        { id: 'system', label: 'System' }
    ];

    // Filter and search notifications
    const filteredNotifications = useMemo(() => {
        let filtered = [...notifications];

        // Apply filter
        if (activeFilter === 'unread') {
            filtered = filtered.filter(n => !n.read);
        } else if (activeFilter !== 'all') {
            filtered = filtered.filter(n => n.category === activeFilter);
        }

        // Apply search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(n =>
                n.title.toLowerCase().includes(query) ||
                n.message.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [notifications, activeFilter, searchQuery]);

    // Pagination
    const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
    const paginatedNotifications = filteredNotifications.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Background Blobs */}
            <div className="fixed inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-40 -left-20 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-40 right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto p-6 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Notifications</h1>
                    <p className="text-gray-600">Stay updated with your plant diagnoses and system alerts</p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    {/* Search Bar */}
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search notifications..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <Filter size={18} className="text-gray-500" />
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => {
                                    setActiveFilter(filter.id);
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFilter === filter.id
                                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* Results count */}
                    <p className="text-sm text-gray-500 mt-4">
                        Showing {paginatedNotifications.length} of {filteredNotifications.length} notifications
                    </p>
                </div>

                {/* Notifications List */}
                <div className="space-y-3">
                    {paginatedNotifications.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No notifications found</h3>
                            <p className="text-gray-500">Try adjusting your filters or search query</p>
                        </div>
                    ) : (
                        paginatedNotifications.map((notification) => (
                            <div key={notification.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                                <NotificationItem notification={notification} compact={false} />
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-8 flex items-center justify-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Previous
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg font-medium ${currentPage === page
                                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                                            : 'bg-white border border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationPage;
