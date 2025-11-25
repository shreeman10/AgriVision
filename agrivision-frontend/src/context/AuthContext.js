import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if auth is initialized correctly (real Firebase instance has 'app' property)
    const isMock = !auth.app;

    function signup(email, password) {
        if (isMock) {
            console.log("Mock signup:", email);
            return Promise.resolve({ user: { email } });
        }
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        if (isMock) {
            console.log("Mock login:", email);
            const mockUser = { email, uid: 'mock-user-id' };
            setCurrentUser(mockUser);
            return Promise.resolve({ user: mockUser });
        }
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        if (isMock) {
            console.log("Mock logout");
            setCurrentUser(null);
            return Promise.resolve();
        }
        return signOut(auth);
    }

    function googleSignIn() {
        if (isMock) {
            console.log("Mock Google Sign In");
            const mockUser = { email: 'mock@gmail.com', uid: 'mock-google-id' };
            setCurrentUser(mockUser);
            return Promise.resolve({ user: mockUser });
        }
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        if (isMock) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, [isMock]);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        googleSignIn
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
