import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './UserDropdown.css';

const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dropdownRef = useRef(null);
    const { currentUser, login, logout } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setError('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        const success = await login(username, password);
        if (success) {
            setIsOpen(false);
            setUsername('');
            setPassword('');
        } else {
            setError('Invalid username or password');
        }
    };

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    return (
        <div className="user-dropdown-container" ref={dropdownRef}>
            <button 
                className="user-dropdown-button" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {currentUser ? currentUser.fullName : 'User'}
            </button>

            {isOpen && (
                <div className="dropdown-content">
                    {!currentUser ? (
                        <div className="login-form">
                            <h2>SIGN IN</h2>
                            {error && <div className="error-message">{error}</div>}
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="Enter Username"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter Password"
                                    />
                                </div>
                                <button type="submit" className="sign-in-button">
                                    SIGN IN
                                </button>
                            </form>
                            <div className="login-footer">
                                <Link to="/forgot-password">Forgot Password?</Link>
                                <div className="divider">OR</div>
                                <button className="social-login-button facebook">
                                    <i className="fab fa-facebook"></i>
                                    Login with Facebook
                                </button>
                                <button className="social-login-button google">
                                    <i className="fab fa-google"></i>
                                    Login with Google +
                                </button>
                                <div className="register-link">
                                    New Member? <Link to="/registration">Register Now</Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="user-menu">
                            <Link 
                                to="/user-account" 
                                className="menu-item" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log('Navigating to user account');
                                    setIsOpen(false);
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15C15.3137 15 18 12.3137 18 9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9C6 12.3137 8.68629 15 12 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2.90625 20.2491C3.82834 18.6531 5.15423 17.3278 6.75128 16.4064C8.34833 15.485 10.1534 15 12.0002 15C13.8471 15 15.6521 15.4851 17.2492 16.4065C18.8462 17.3279 20.1721 18.6533 21.0942 20.2493" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                My Account
                            </Link>
                            <button className="menu-item" onClick={handleLogout}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15 12H3.62" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.85 8.6499L2.5 11.9999L5.85 15.3499" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserDropdown; 