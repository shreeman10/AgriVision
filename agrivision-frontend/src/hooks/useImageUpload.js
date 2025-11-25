import { useState } from 'react';

const useImageUpload = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    return { image, handleImageChange };
};

export default useImageUpload;
