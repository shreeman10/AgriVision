import React from 'react';
import Navbar from '../Navigation/Navbar';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <footer className="glass mt-auto p-4 text-center text-gray-700">
                &copy; 2025 AgriVision
            </footer>
        </div>
    );
};

export default MainLayout;
