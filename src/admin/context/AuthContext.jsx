import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({
    token: null,
    user: null,
    login: () => {},
    logout: () => {}
});



export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        token: localStorage.getItem('token') || null,
        user: JSON.parse(localStorage.getItem('user')) || null,
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
