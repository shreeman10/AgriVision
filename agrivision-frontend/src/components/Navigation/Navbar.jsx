import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../Auth/AuthModal';
import NotificationBell from '../Notifications/NotificationBell';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isActive = (path) => location.pathname === path ? 'text-pink-600 font-bold' : 'text-gray-600 hover:text-pink-500';

    const handleLogout = async () => {
        try {
            await logout();
            setIsMenuOpen(false);
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    const openAuthModal = (mode) => {
        setAuthMode(mode);
        setIsAuthModalOpen(true);
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className="sticky top-0 z-50 glass shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <img
                            src="/favicon.ico"
                            alt="AgriGuard Logo"
                            className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
                        />
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className={`text-base font-medium transition-colors ${isActive('/')}`}>Home</Link>
                        <Link to="/diagnosis" className={`text-base font-medium transition-colors ${isActive('/diagnosis')}`}>Diagnosis</Link>
                        <Link to="/diseases" className={`text-base font-medium transition-colors ${isActive('/diseases')}`}>Diseases</Link>
                        <Link to="/dashboard" className={`text-base font-medium transition-colors ${isActive('/dashboard')}`}>Dashboard</Link>
                        <Link to="/help" className={`text-base font-medium transition-colors ${isActive('/help')}`}>Help</Link>
                    </div>

                    {/* Right Action Buttons (Desktop) */}
                    <div className="hidden md:flex items-center gap-4">
                        {currentUser ? (
                            <>
                                <NotificationBell />
                                <div className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                                            {currentUser.email?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {currentUser.email?.split('@')[0]}
                                        </span>
                                        <ChevronDown size={16} className="text-gray-500" />
                                    </button>

                                    {isUserDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900">{currentUser.displayName || 'User'}</p>
                                                <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setIsUserDropdownOpen(false);
                                                    navigate('/profile');
                                                }}
                                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3"
                                            >
                                                <User size={16} />
                                                Profile & Settings
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsUserDropdownOpen(false);
                                                    handleLogout();
                                                }}
                                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                                            >
                                                <LogOut size={16} />
                                                Log Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => openAuthModal('login')}
                                    className="px-5 py-2 text-base text-gray-700 font-semibold hover:text-pink-600 transition-colors"
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={() => openAuthModal('signup')}
                                    className="px-5 py-2 text-base text-white font-semibold bg-gradient-to-r from-pink-500 to-violet-500 hover:opacity-90 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                                >
                                    Sign Up
                                </button>
                            </>
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
                        <Link to="/diagnosis" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium ${isActive('/diagnosis')}`}>Diagnosis</Link>
                        <Link to="/diseases" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium ${isActive('/diseases')}`}>Diseases</Link>
                        <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium ${isActive('/dashboard')}`}>Dashboard</Link>
                        <Link to="/help" onClick={() => setIsMenuOpen(false)} className={`text-lg font-medium ${isActive('/help')}`}>Help</Link>

                        <div className="h-px bg-gray-200 my-2"></div>

                        {currentUser ? (
                            <>
                                <div className="bg-gray-50 rounded-xl p-3">
                                    <p className="text-sm font-semibold text-gray-900">{currentUser.displayName || 'User'}</p>
                                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                                </div>
                                <Link
                                    to="/profile"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-left text-lg font-semibold text-gray-700 hover:text-pink-600 flex items-center gap-2"
                                >
                                    <User size={20} />
                                    Profile & Settings
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-left text-lg font-semibold text-red-600 hover:text-red-700 flex items-center gap-2"
                                >
                                    <LogOut size={20} />
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => openAuthModal('login')}
                                    className="text-left text-lg font-semibold text-gray-700 hover:text-pink-600"
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={() => openAuthModal('signup')}
                                    className="text-center py-3 text-white font-semibold bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl shadow-md"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </nav>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                initialMode={authMode}
            />
        </>
    );
};

export default Navbar;
