import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import './UserAccount.css';

// Validation rules
const validateForm = (data) => {
    const errors = {};
    
    // Full Name validation
    if (!data.fullName.trim()) {
        errors.fullName = 'Họ và tên không được để trống';
    } else if (data.fullName.trim().length < 2) {
        errors.fullName = 'Họ và tên phải có ít nhất 2 ký tự';
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email) {
        errors.email = 'Email không được để trống';
    } else if (!emailRegex.test(data.email)) {
        errors.email = 'Email không hợp lệ';
    }
    
    // Phone validation
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!data.phone) {
        errors.phone = 'Số điện thoại không được để trống';
    } else if (!phoneRegex.test(data.phone)) {
        errors.phone = 'Số điện thoại không hợp lệ';
    }
    
    // Gender validation
    if (!data.gender) {
        errors.gender = 'Vui lòng chọn giới tính';
    }
    
    // Birth Date validation
    if (!data.birthDate) {
        errors.birthDate = 'Ngày sinh không được để trống';
    } else {
        const birthDate = new Date(data.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18) {
            errors.birthDate = 'Bạn phải đủ 18 tuổi';
        } else if (age > 100) {
            errors.birthDate = 'Ngày sinh không hợp lệ';
        }
    }
    
    return errors;
};

// Components for each section
const PersonalInfo = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        birthDate: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(''); // 'success' or 'error'
    
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Clear error when user starts typing
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
        
        // Clear submit status when form is modified
        setSubmitStatus('');
        
        if (name === 'gender' && type === 'checkbox') {
            setFormData(prev => ({
                ...prev,
                [name]: checked ? value : ''
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSubmitStatus('error');
            return;
        }
        
        setIsLoading(true);
        setSubmitStatus('');
        
        // Simulate API call //custom hook, re-render component//
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Form submitted:', formData);
            setSubmitStatus('success');
            // You would typically make your API call here
        } catch (error) {
            setSubmitStatus('error');
            setErrors({ submit: 'Có lỗi xảy ra. Vui lòng thử lại.' });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleAvatarChange = () => {
        // Handle avatar change logic
        console.log('Change avatar clicked');
        // You can implement file upload logic here
    };

    return (
        <div className="personal-info-section">
            <h2>Personal Information</h2>
            
            {/* Show success message */}
            {submitStatus === 'success' && (
                <div className="message-container success">
                    <span className="message-icon">✓</span>
                    Cập nhật thông tin thành công!
                </div>
            )}
            
            {/* Show submit error if any */}
            {errors.submit && (
                <div className="message-container error">
                    <span className="message-icon">!</span>
                    {errors.submit}
                </div>
            )}
            
            <div className="personal-info-container">
                {/* Left Column - Avatar */}
                <div className="avatar-section">
                    <div className="avatar-wrapper">
                        <img 
                            src="https://via.placeholder.com/150" 
                            alt="" 
                            className="avatar-image"
                        />
                    </div>
                    <button 
                        type="button"
                        className="change-avatar-btn"
                        onClick={handleAvatarChange}
                    >
                        Change Avatar
                    </button>
                </div>

                {/* Right Column - Form */}
                <div className="info-form-section">
                    <form className={`info-form-personal ${isLoading ? 'loading' : ''}`} onSubmit={handleSubmit}>
                        <div className={`form-group-personal ${errors.fullName ? 'error' : ''}`}>
                            <label htmlFor="fullName">Full Name</label>
                            <input 
                                type="text" 
                                id="fullName" 
                                name="fullName" 
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                        </div>

                        <div className={`form-group-personal ${errors.email ? 'error' : ''}`}>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            {errors.email && <span className="error-message">{errors.email}</span>}
                        </div>

                        <div className={`form-group-personal ${errors.phone ? 'error' : ''}`}>
                            <label htmlFor="phone">Phone Number</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                name="phone" 
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                        </div>

                        <div className={`form-group-personal gender-group ${errors.gender ? 'error' : ''}`}>
                            <label className="group-label">Gender</label>
                            <div className="checkbox-group">
                                <div className="checkbox-item">
                                    <input 
                                        type="checkbox" 
                                        id="male" 
                                        name="gender" 
                                        value="male"
                                        checked={formData.gender === 'male'}
                                        onChange={handleInputChange}
                                    />
                                    <label className="checkbox-label" htmlFor="male">Nam</label>
                                </div>
                                <div className="checkbox-item">
                                    <input 
                                        type="checkbox" 
                                        id="female" 
                                        name="gender" 
                                        value="female"
                                        checked={formData.gender === 'female'}
                                        onChange={handleInputChange}
                                    />
                                    <label className="checkbox-label" htmlFor="female">Nữ</label>
                                </div>
                                <div className="checkbox-item">
                                    <input 
                                        type="checkbox" 
                                        id="other" 
                                        name="gender" 
                                        value="other"
                                        checked={formData.gender === 'other'}
                                        onChange={handleInputChange}
                                    />
                                    <label className="checkbox-label" htmlFor="other">Khác</label>
                                </div>
                            </div>
                            {errors.gender && <span className="error-message">{errors.gender}</span>}
                        </div>

                        <div className={`form-group-personal ${errors.birthDate ? 'error' : ''}`}>
                            <label htmlFor="birthDate">Birth Date</label>
                            <input 
                                type="date" 
                                id="birthDate" 
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleInputChange}
                            />
                            {errors.birthDate && <span className="error-message">{errors.birthDate}</span>}
                        </div>
                    </form>
                </div>
            </div>
            <div className="update-info-btn-container">
                <button 
                    type="submit" 
                    className={`update-info-btn ${submitStatus}`}
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? 'Updating...' : 'Update Information'}
                </button>
            </div>
        </div>
    );
};

const MyOrders = () => (
    <div>
        <h2>My Orders</h2>
        <p>View your order history here.</p>
    </div>
);

const Address = () => (
    <div>
        <h2>Address</h2>
        <p>Manage your addresses here.</p>
    </div>
);

const PaymentMethod = () => (
    <div>
        <h2>Payment Method</h2>
        <p>Manage your payment methods here.</p>
    </div>
);

const Security = () => (
    <div>
        <h2>Security</h2>
        <p>Manage your security settings here.</p>
    </div>
);

export default function UserAccountContent() {
    const location = useLocation();

    const breadcrumbItems = [
        {      
            label: 'Home',
            path: '/',
        },
        {
            label: 'User Account'
        }
    ];

    const menuItems = [
        { 
            path: '/user-account', 
            label: 'Personal Information', 
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_2_20164)">
                        <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.6193 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.6193 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        <path d="M5.01099 19.166C5.18284 16.5603 7.35079 14.5 9.99999 14.5H14C16.6457 14.5 18.8114 16.5548 18.9883 19.1556" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_2_20164">
                            <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            )
        },
        { 
            path: '/user-account/orders', 
            label: 'My Orders', 
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 16L18 18L22 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        { 
            path: '/user-account/address', 
            label: 'Address', 
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 11C13.1046 11 14 10.1046 14 9C14 7.89543 13.1046 7 12 7C10.8954 7 10 7.89543 10 9C10 10.1046 10.8954 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        { 
            path: '/user-account/payment', 
            label: 'Payment Method', 
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        { 
            path: '/user-account/security', 
            label: 'Security', 
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        }
    ];

    // Function to render content based on current path
    const renderContent = () => {
        switch (location.pathname) {
            case '/user-account':
                return <PersonalInfo />;
            case '/user-account/orders':
                return <MyOrders />;
            case '/user-account/address':
                return <Address />;
            case '/user-account/payment':
                return <PaymentMethod />;
            case '/user-account/security':
                return <Security />;
            default:
                return <PersonalInfo />;
        }
    };

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <section className="user-account-page">
                <div className="user-account-container">
                    <div className="user-account-layout">
                        {/* Sidebar */}
                        <div className="user-account-sidebar">
                            <nav>
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
                                    >
                                        <span className="sidebar-icon">{item.icon}</span>
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Main Content */}
                        <div className="user-account-main">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}