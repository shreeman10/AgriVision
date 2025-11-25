import api from './api';

/**
 * Upload an image for plant disease analysis
 * @param {FormData} formData - FormData containing the image and optional user_email
 * @returns {Promise} Analysis result with id, status, and other details
 */
export const uploadImage = async (formData) => {
    const response = await api.post('/analysis/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

/**
 * Get all diagnosis history
 * @returns {Promise} Array of analysis results
 */
export const getDiagnosisHistory = async () => {
    const response = await api.get('/analysis/');
    return response.data;
};

/**
 * Get a specific analysis result by ID
 * @param {number} id - Analysis ID
 * @returns {Promise} Analysis result details
 */
export const getAnalysisById = async (id) => {
    const response = await api.get(`/analysis/${id}/`);
    return response.data;
};

/**
 * Get recent analyses (last 10)
 * @returns {Promise} Array of recent analysis results
 */
export const getRecentAnalyses = async () => {
    const response = await api.get('/analysis/recent/');
    return response.data;
};

/**
 * Reprocess an existing analysis
 * @param {number} id - Analysis ID
 * @returns {Promise} Reprocessing status
 */
export const reprocessAnalysis = async (id) => {
    const response = await api.post(`/analysis/${id}/reprocess/`);
    return response.data;
};
