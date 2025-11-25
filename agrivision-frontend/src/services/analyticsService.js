import api from './api';

export const getAnalyticsData = async () => {
    const response = await api.get('/analytics/dashboard/');
    return response.data;
};
