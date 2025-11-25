import React, { createContext, useState } from 'react';

const DiagnosisContext = createContext();

export const DiagnosisProvider = ({ children }) => {
    const [diagnosisHistory, setDiagnosisHistory] = useState([]);

    const addDiagnosis = (diagnosis) => {
        setDiagnosisHistory((prev) => [...prev, diagnosis]);
    };

    return (
        <DiagnosisContext.Provider value={{ diagnosisHistory, addDiagnosis }}>
            {children}
        </DiagnosisContext.Provider>
    );
};

export default DiagnosisContext;
