import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import PersonalInfo from './PersonalInformation';
import MyOrders from './MyOrders';
import PersonalAddress from './PersonalAddress';
import PaymentMethod from './PaymentMethod/PaymentMethod';
import './UserAccount.css';


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
                return <PersonalAddress />;
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