import React from 'react';

const ReportCard = ({ title, content }) => {
    return (
        <div className="bg-white shadow rounded p-4">
            <h3 className="font-bold text-lg">{title}</h3>
            <p>{content}</p>
        </div>
    );
};

export default ReportCard;
