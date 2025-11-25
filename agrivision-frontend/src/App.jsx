import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import { DiagnosisProvider } from './context/DiagnosisContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import MainLayout from './components/Layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DiagnosisPage from './pages/DiagnosisPage';
import DashboardPage from './pages/DashboardPage';
import HelpPage from './pages/HelpPage';
import DiseasesPage from './pages/DiseasesPage';

function App() {
    return (
        <AuthProvider>
            <NotificationProvider>
                <AppProvider>
                    <DiagnosisProvider>
                        <Router>
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
                                <Route path="/login" element={<LoginPage />} />

                                {/* Protected Routes */}
                                <Route
                                    path="/dashboard"
                                    element={
                                        <ProtectedRoute>
                                            <DashboardPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/diagnosis"
                                    element={
                                        <ProtectedRoute>
                                            <DiagnosisPage />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/diseases"
                                    element={
                                        <ProtectedRoute>
                                            <MainLayout><DiseasesPage /></MainLayout>
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/help"
                                    element={
                                        <ProtectedRoute>
                                            <MainLayout><HelpPage /></MainLayout>
                                        </ProtectedRoute>
                                    }
                                />
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
