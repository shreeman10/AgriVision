import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check authentication status on mount
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = () => {
        const token = localStorage.getItem('authToken');
        const userInfo = localStorage.getItem('userInfo');
        
        if (token && userInfo) {
            try {
                setCurrentUser(JSON.parse(userInfo));
            } catch (error) {
                console.error('Error parsing user info:', error);
                localStorage.removeItem('authToken');
                localStorage.removeItem('userInfo');
            }
        }
        setLoading(false);
    };

    const login = async (username, password) => {
        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Invalid credentials');
            }

            const data = await response.json();
            
            // Store token and user info
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data.user));
            
            setCurrentUser(data.user);
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem('authToken');
            
            // Optional: Call Django logout endpoint
            if (token) {
                await fetch('http://localhost:8000/api/logout/', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                }).catch(err => console.error('Logout API error:', err));
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Always clear local storage and state
            localStorage.removeItem('authToken');
            localStorage.removeItem('userInfo');
            setCurrentUser(null);
            toast.success('Logged out successfully');
        }
    };

    const isAuthenticated = () => {
        return !!localStorage.getItem('authToken');
    };

    const value = {
        currentUser,
        login,
        logout,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
