import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout, isAuthenticated } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path ? 'text-pink-600 font-bold' : 'text-gray-600 hover:text-pink-500';

    const handleLogout = async () => {
        await logout();
        setIsMenuOpen(false);
        navigate('/');
    };

    const authenticated = isAuthenticated();

    return (
        <nav className="sticky top-0 z-50 glass shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img
                        src="/favicon.ico"
                        alt="AgriVision Logo"
                        className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
                    />
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className={`text-base font-medium transition-colors ${isActive('/')}`}>Home</Link>
                    {authenticated && (
                        <>
                            <Link to="/diagnosis" className={`text-base font-medium transition-colors ${isActive('/diagnosis')}`}>Diagnosis</Link>
                            <Link to="/diseases" className={`text-base font-medium transition-colors ${isActive('/diseases')}`}>Diseases</Link>
                            <Link to="/dashboard" className={`text-base font-medium transition-colors ${isActive('/dashboard')}`}>Dashboard</Link>
                            <Link to="/help" className={`text-base font-medium transition-colors ${isActive('/help')}`}>Help</Link>
                        </>
                    )}
                </div>

                {/* Right Action Buttons (Desktop) */}
                <div className="hidden md:flex items-center gap-4">
                    {authenticated ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                                    {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span className="text-sm font-medium text-gray-700">
                                    {currentUser?.username || 'User'}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            className="px-5 py-2 text-base text-white font-semibold bg-gradient-to-r from-pink-500 to-violet-500 hover:opacity-90 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        >
                            Login
                        </button>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 hover:text-pink-600 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg py-4 px-6 flex flex-col space-y-4 animate-fade-in-down">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium ${isActive('/')}`}>Home</Link>

                    {authenticated && (
                        <>
                            <Link to="/diagnosis" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium ${isActive('/diagnosis')}`}>Diagnosis</Link>
                            <Link to="/diseases" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium ${isActive('/diseases')}`}>Diseases</Link>
                            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium ${isActive('/dashboard')}`}>Dashboard</Link>
                            <Link to="/help" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium ${isActive('/help')}`}>Help</Link>
                        </>
                    )}

                    <div className="h-px bg-gray-200 my-2"></div>

                    {authenticated ? (
                        <>
                            <div className="bg-gray-50 rounded-xl p-3">
                                <p className="text-sm font-semibold text-gray-900">{currentUser?.username || 'User'}</p>
                                <p className="text-xs text-gray-500">{currentUser?.email || ''}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-left text-lg font-semibold text-red-600 hover:text-red-700 flex items-center gap-2"
                            >
                                <LogOut size={20} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                navigate('/login');
                            }}
                            className="text-center py-3 text-white font-semibold bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl shadow-md"
                        >
                            Login
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
