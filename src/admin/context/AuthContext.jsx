import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext({
    token: null,
    user: null,
    login: () => {},
    logout: () => {}
});

// Fungsi cek apakah token sudah expired
const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now(); // convert to ms
    } catch (err) {
        return true;
    }
};

export const AuthProvider = ({ children }) => {
    const rawToken = localStorage.getItem('token');
    const rawUser = localStorage.getItem('user');

    const validToken = rawToken && !isTokenExpired(rawToken) ? rawToken : null;

    const [authState, setAuthState] = useState({
        token: validToken,
        user: validToken ? JSON.parse(rawUser) : null
    });

    const login = (token, user) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setAuthState({ token, user });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ token: null, user: null });
        window.location.href = '/login';
    };

    // Intercept error response global
    useEffect(() => {
        if (authState.token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
        }

        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (
                    error.response &&
                    error.response.status === 401 &&
                    error.response.data?.isTokenInvalid
                ) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [authState.token]);

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
