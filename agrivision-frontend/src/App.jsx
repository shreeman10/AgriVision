import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import { DiagnosisProvider } from './context/DiagnosisContext';
import MainLayout from './components/Layouts/MainLayout';
import HomePage from './pages/HomePage';
import DiagnosisPage from './pages/DiagnosisPage';
import ResultsPage from './pages/ResultsPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import HelpPage from './pages/HelpPage';
import DiseasesPage from './pages/DiseasesPage';
import NotificationPage from './pages/NotificationPage';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
    return (
        <AuthProvider>
            <NotificationProvider>
                <AppProvider>
                    <DiagnosisProvider>
                        <Router>
                            <Routes>
                                <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
                                <Route path="/results" element={<MainLayout><ResultsPage /></MainLayout>} />
                                <Route path="/help" element={<MainLayout><HelpPage /></MainLayout>} />
                                <Route path="/diseases" element={<MainLayout><DiseasesPage /></MainLayout>} />
                                <Route path="/notifications" element={<MainLayout><NotificationPage /></MainLayout>} />
                                <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
                                <Route path="/diagnosis" element={<DiagnosisPage />} />
                                <Route path="/dashboard" element={<DashboardPage />} />
                            </Routes>
                        </Router>
                        <Toaster position="top-right" />
                    </DiagnosisProvider>
                </AppProvider>
            </NotificationProvider>
        </AuthProvider>
    );
}

export default App;
