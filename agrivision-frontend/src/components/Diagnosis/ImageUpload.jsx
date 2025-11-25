import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '../../context/AuthContext';
import { calculateImageHash, generateKeyPair, signFile, exportPublicKey } from '../../utils/crypto';

const ImageUpload = ({ onAnalyze }) => {
    const [file, setFile] = useState(null);
    const [imageHash, setImageHash] = useState(null);
    const [digitalSignature, setDigitalSignature] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState(null);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setError(null);

        if (rejectedFiles.length > 0) {
            const rejection = rejectedFiles[0];
            if (rejection.errors[0].code === 'file-too-large') {
                setError('File is too large. Max size is 5MB.');
            } else if (rejection.errors[0].code === 'file-invalid-type') {
                setError('Invalid file type. Please upload an image (JPG, PNG, WebP).');
            } else {
                setError('Failed to upload file. Please try again.');
            }
            return;
        }

        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));

        // Calculate hash
        calculateImageHash(selectedFile).then(hash => {
            setImageHash(hash);
        }).catch(err => {
            console.error("Error calculating hash:", err);
        });

        // Generate Key Pair and Sign (Simulating Digital Signature)
        generateKeyPair().then(async (keyPair) => {
            const signature = await signFile(keyPair.privateKey, selectedFile);
            setDigitalSignature(signature);
        }).catch(err => {
            console.error("Error generating signature:", err);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        maxSize: 5 * 1024 * 1024, // 5MB
        multiple: false
    });

    const handleRemove = (e) => {
        e.stopPropagation();
        setFile(null);
        setPreview(null);
        setImageHash(null);
        setDigitalSignature(null);
        setError(null);
    };

    const handleAnalyze = () => {
        if (!file) return;

        // Pass the file to parent component
        if (onAnalyze) {
            onAnalyze(file);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300 cursor-pointer ${isDragActive
                    ? 'border-pink-400 bg-pink-50'
                    : error
                        ? 'border-red-300 bg-red-50'
                        : 'border-gray-300 hover:border-pink-300 hover:bg-gray-50'
                    }`}
            >
                <input {...getInputProps()} />

                {preview ? (
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-h-80 mx-auto rounded-2xl shadow-lg object-contain"
                        />
                        <button
                            onClick={handleRemove}
                            className="absolute -top-4 -right-4 bg-white text-red-500 rounded-full p-2 shadow-md hover:bg-red-50 transition-colors"
                        >
                            ✕
                        </button>
                        <p className="mt-4 text-sm text-gray-500 font-medium">{file.name}</p>
                        {imageHash && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs font-mono text-gray-600 break-all text-left">
                                <span className="font-bold text-gray-800 block mb-1">SHA-256 Hash (Integrity Check):</span>
                                {imageHash}
                            </div>
                        )}
                        {digitalSignature && (
                            <div className="mt-2 p-3 bg-blue-50 rounded-xl border border-blue-200 text-xs font-mono text-blue-600 break-all text-left">
                                <span className="font-bold text-blue-800 block mb-1">Digital Signature (RSA-PSS):</span>
                                {digitalSignature.substring(0, 64)}...
                            </div>
                        )}
                    </div>
                ) : (

                    <div className="py-10">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-gray-400">
                            📸
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            {isDragActive ? 'Drop the image here' : 'Drag & Drop or Click to Upload'}
                        </h3>
                        <p className="text-gray-500 max-w-xs mx-auto">
                            Upload a clear photo of the plant leaf. Supports JPG, PNG, WebP (Max 5MB).
                        </p>
                    </div>
                )}
            </div>

            {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 text-sm font-medium animate-fade-in-up">
                    <span>⚠️</span> {error}
                </div>
            )}

            <button
                onClick={handleAnalyze}
                disabled={!file}
                className={`w-full mt-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-3 ${!file
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-pink-400 to-yellow-400 text-gray-900 hover:opacity-95 hover:shadow-xl transform hover:-translate-y-1'
                    }`}
            >
                <span>🔍</span> Analyze Plant Health
            </button>
        </div>
    );
};

export default ImageUpload;
