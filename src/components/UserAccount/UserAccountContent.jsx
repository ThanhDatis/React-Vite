import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import './UserAccount.css';

export default function UserAccountContent () {

    const breadcrumbItems = [
        {      
            label: 'Home',
            path: '/',
        },
        {
            label: 'User Account'
            // path: '/user-account',
        }
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <section className="user-account-page">
                <div className="user-account-container">
                    <div className="user-account-content">
                        <h1>My Account</h1>
                        <p>Welcome to your account page!</p>
                    </div>
                </div>
            </section>
        </>
    )
}