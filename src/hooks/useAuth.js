import { useContext } from 'react';
import { AuthContext } from '../store/contexts/AuthContext';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const useAuthHelpers = () => {
    const { currentUser, login, logout } = useAuth();
    
    const isAuthenticated = !!currentUser;

    const hasRole = (role) => {
        return currentUser?.role === role;
    };
    const hasPermission = (permission) => {
        return currentUser?.permissions?.includes(permission);
    };

    const getUserInfo = () => {
        if (!currentUser) return null;

        return {
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email,
            role: currentUser.role,
            fullName: currentUser.fullName,
        };
    };

    const loginWithValidation = async (username, password) => {
        try {
            if (!username || !password) {
                throw new Error('Username and password are required');
            }
            const result = await login(username, password);

            if (!result) {
                throw new Error('Login failed');
            }

            return {success: true, message: 'Login successful'};
        } catch (error) {
            return {success: false, message: error.message || 'An error occurred during login'};
        }
    };

    const logoutWithCleanup = async () => {
        try {
            logout();
            return {success: true, message: 'Logout successful'};
        } catch (error) {
            return {success: false, message: error.message || 'An error occurred during logout'};
        }
    };
    return {
        currentUser,
        isAuthenticated,
        hasRole,
        hasPermission,
        getUserInfo,
        login: loginWithValidation,
        logout: logoutWithCleanup
    };
};