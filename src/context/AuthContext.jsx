import React, { createContext, useContext, useState } from 'react';
import { users } from '../data/users';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('currentUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (username, password) => {
        const user = users.find(
            u => u.username === username && u.password === password
        );
        
        if (user) {
            const { password, ...userWithoutPassword } = user;  // eslint-disable-line no-unused-vars
            setCurrentUser(userWithoutPassword);
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            return true;
        }
        return false;
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 