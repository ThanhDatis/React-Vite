import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';
import MobileHeader from './MobileHeader';
import DesktopHeader from './DesktopHeader';

const Header = () => {
    // Theme and responsive
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const { currentUser, login, logout } = useAuth();

    // Mobile drawer state
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    // Login form state
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Desktop dropdown states
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    const [brandsMenuAnchor, setBrandsMenuAnchor] = useState(null);

    // Search state
    const [searchValue, setSearchValue] = useState('');

    // Brand data
    const brands = [
        'Adidas',
        'Apple', 
        'Bose',
        'Canon',
        'Dell',
        'Dyson',
    ];

    // Navigation items
    const navItems = [
        { label: 'SKINCARE', path: '/skincare' },
        { label: 'MAKE UP', path: '/makeup' },
        { label: 'HAIRCARE', path: '/haircare' },
        { label: 'BATH & BODY', path: '/bath-body' },
        { label: 'BEAUTY SUPPLEMENTS', path: '/fragrance' },
        { label: 'PROMOS', path: '/promos' },
    ];

    // === HANDLERS ===

    // Login handlers
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        const success = await login(username, password);
        if (success) {
            resetLoginForm();
            closeAllMenus();
        } else {
            setError('Invalid username or password');
        }
    };

    const handleLogout = () => {
        logout();
        closeAllMenus();
    };

    // Menu handlers
    const handleUserMenuToggle = (event) => {
        if (isMobile) {
            setShowLoginForm(!showLoginForm);
        } else {
            setUserMenuAnchor(userMenuAnchor ? null : event.currentTarget);
            setShowLoginForm(!showLoginForm);
        }
    };

    const handleBrandsMenuOpen = (event) => {
        setBrandsMenuAnchor(event.currentTarget);
    };

    const handleBrandsMenuClose = () => {
        setBrandsMenuAnchor(null);
    };

    // Mobile drawer handlers
    const handleMobileDrawerToggle = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
        if (isMobile) {
            setShowLoginForm(false);
            setError('');
        }
    };

    // Navigation handlers
    const handleAccountClick = () => {
        navigate('/user-account');
        closeAllMenus();
    };

    const handleCartClick = () => {
        navigate('/cart');
        closeAllMenus();
    };

    // Search handlers
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            console.log('Searching for:', searchValue);
            closeAllMenus();
        }
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    // Utility functions
    const resetLoginForm = () => {
        setShowLoginForm(false);
        setUsername('');
        setPassword('');
        setError('');
    };

    const closeAllMenus = () => {
        setShowLoginForm(false);
        setUserMenuAnchor(null);
        setBrandsMenuAnchor(null);
        setMobileDrawerOpen(false);
        setError('');
    };

    // === COMPUTED VALUES ===
    const isUserMenuOpen = Boolean(userMenuAnchor);
    const isBrandsMenuOpen = Boolean(brandsMenuAnchor);

    // === SHARED PROPS ===
    const sharedProps = {
        // Auth data
        currentUser,
        
        // States
        showLoginForm,
        mobileDrawerOpen,
        searchValue,
        username,
        password,
        error,
        
        // Menu states
        isUserMenuOpen,
        isBrandsMenuOpen,
        userMenuAnchor,
        brandsMenuAnchor,
        
        // Data
        brands,
        navItems,
        
        // Handlers
        handleLogin,
        handleLogout,
        handleUserMenuToggle,
        handleBrandsMenuOpen,
        handleBrandsMenuClose,
        handleMobileDrawerToggle,
        handleAccountClick,
        handleCartClick,
        handleSearch,
        handleSearchChange,
        closeAllMenus,
        
        // Setters for form
        setUsername,
        setPassword,
        setError,
    };

    return (
        <header className="header">
            {isMobile ? (
                <MobileHeader {...sharedProps} />
            ) : (
                <DesktopHeader {...sharedProps} />
            )}
        </header>
    );
};

export default Header;