import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../assets/styles/HeaderMenuIcons.css';

export default function HeaderMenuIcons() {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const loginFormRef = useRef(null);
    const userBtnRef = useRef(null);
    const { currentUser, login, logout } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        const success = await login(username, password);
        if (success) {
            setShowLoginForm(false);
            setUsername('');
            setPassword('');
        } else {
            setError('Invalid username or password');
        }
    };

    const handleLogout = () => {
        logout();
        setShowLoginForm(false);
    };
    
    const toggleLoginForm = (e) => {
        e.preventDefault();
        setShowLoginForm(!showLoginForm);
    };

    // Xử lý đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                loginFormRef.current && 
                !loginFormRef.current.contains(event.target) &&
                userBtnRef.current &&
                !userBtnRef.current.contains(event.target)
            ) {
                setShowLoginForm(false);
                setError('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="headerTopBar-menu">
            <div className="headerTopBar-menuItem">
                <div className="menuItem-cart">
                    <Link to="/cart" className="Cart">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.25 22.5C11.2165 22.5 12 21.7165 12 20.75C12 19.7835 11.2165 19 10.25 19C9.2835 19 8.5 19.7835 8.5 20.75C8.5 21.7165 9.2835 22.5 10.25 22.5Z" fill="#333333"/>
                            <path d="M18.75 22.5C19.7165 22.5 20.5 21.7165 20.5 20.75C20.5 19.7835 19.7165 19 18.75 19C17.7835 19 17 19.7835 17 20.75C17 21.7165 17.7835 22.5 18.75 22.5Z" fill="#333333"/>
                            <path d="M2.5 3L7 6L9.5 17H19.5L22 8.5H12.5" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12.5 13H16.1364H20.5" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Cart</span>
                    </Link>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg"  
                width="24" height="24" viewBox="0 0 24 24" fill="none"  
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"  
                strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-tallymark-1">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 0l0 24" />
            </svg>
            <div className="headerTopBar-menuItem">
                <div className="menuItem-user">
                    <a className="User" href="" onClick={toggleLoginForm} ref={userBtnRef}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M21 22C21 17.0294 16.9706 13 12 13C7.02945 13 3 17.0294 3 22" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>                                                        
                        <span>{currentUser ? currentUser.fullName : 'User'}</span>
                    </a>
                    
                    {showLoginForm && (
                        <div className="login-dropdown" ref={loginFormRef}>
                            {!currentUser ? (
                                <div className="login-container">
                                    <h2>SIGN IN</h2>
                                    {error && <div className="error-message">{error}</div>}
                                    <form onSubmit={handleLogin} className="login-form-user">
                                        <div className="form-group-user">
                                            <label>Username</label>
                                            <input 
                                                type="text" 
                                                placeholder="Enter Username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                        
                                        <div className="form-group-user">
                                            <label>Password</label>
                                            <input 
                                                type="password" 
                                                placeholder="Enter Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <div className="forgot-password">
                                                <Link to="/forgot-password">Forgot Password?</Link>
                                            </div>
                                        </div>
                                        
                                        <button type="submit" className="signin-button">SIGN IN</button>
                                        
                                        <div className="login-divider">OR</div>
                                        
                                        <button type="button" className="social-login facebook">
                                            <span className="social-icon">
                                                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="16" cy="16" r="14" fill="black"/>
                                                    <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"/>
                                                </svg>
                                            </span>
                                            Login with Facebook
                                        </button>
                                        
                                        <button type="button" className="social-login google">
                                            <span className="social-icon">
                                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"/>
                                                    <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"/>
                                                    <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"/>
                                                    <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"/>
                                                </svg>
                                            </span>
                                            Login with Google +
                                        </button>
                                        
                                        <div className="register-link">
                                            New Member? <Link to="/registration">Register Now</Link>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div className="user-menu">
                                    <Link to="/account" className="menu-item" onClick={() => setShowLoginForm(false)}>
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
            </div>
            <svg xmlns="http://www.w3.org/2000/svg"  
                width="24" height="24" viewBox="0 0 24 24" fill="none"  
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"  
                strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-tallymark-1">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 0l0 24" />
            </svg>
            <div className="headerTopBar-menuItem">
                <div className="menuItem-lang">
                    <a className="Lang" href="">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_2_19421)">
                                <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01"/>
                                <path d="M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z" stroke="#333333" strokeWidth="2" strokeLinejoin="round"/>
                                <path d="M15.5 15.5C15.5 15.5 14.5 17.5 12 17.5C9.5 17.5 8.5 15.5 8.5 15.5" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16.5 10H14.5" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.5 9V11" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_2_19421">
                                    <rect width="24" height="24" fill="white"/>
                                </clipPath>
                            </defs>
                        </svg>                                                        
                        <span>Lang</span>
                    </a>
                </div>
            </div>
        </div>
    );
} 