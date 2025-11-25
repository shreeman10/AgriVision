import { useState } from 'react';
import axios from 'axios';
import { calculateImageHash } from '../utils/crypto';

const useDiagnosis = () => {
    const [diagnosis, setDiagnosis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const diagnoseImage = async (image) => {
        setLoading(true);
        setError(null);
        try {
            const hash = await calculateImageHash(image);

            const formData = new FormData();
            formData.append('image', image);
            formData.append('image_hash', hash);

            const response = await axios.post('http://localhost:8000/api/analysis-results/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setDiagnosis(response.data);
        } catch (err) {
            console.error("Diagnosis failed:", err);
            setError(err.response?.data?.error || err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { diagnosis, loading, error, diagnoseImage };
};

export default useDiagnosis;
