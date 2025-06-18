import React from 'react';
// import { Link } from 'react-router-dom';
import Breadcrumb from '../components/ui/Breadcrumb/Breadcrumb';


export default function Registration() {
    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: 'Registration' }
    ];
    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <section className="registration-page">
                <h2 className="registration-page-title">Registration</h2>
                <div className="registration-content">
                    <div className="registration-socialButton">
                        <button className="registration-socialButton-facebook">
                            <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_510_10262)"/>
                                <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"/>
                                <defs>
                                    <linearGradient id="paint0_linear_510_10262" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#18ACFE"/>
                                        <stop offset="1" stopColor="#0163E0"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                            Register with Facebook
                        </button>
                        <button className="registration-socialButton-google">
                            <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 
                                23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 
                                30.0014 16.3109Z" fill="#4285F4"/>
                                <path d="M16.2862 30C20.1433 30 23.3814 28.7555 25.7465 26.6089L21.2386 23.1865C20.0322 24.011 18.4132 24.5866 
                                16.2862 24.5866C12.5085 24.5866 9.30219 22.1444 8.15923 18.7688L7.9917 18.7827L3.58202 22.1272L3.52435 22.2843C5.87353 
                                26.8577 10.6989 30 16.2862 30Z" fill="#34A853"/>
                                <path d="M8.16007 18.7688C7.85848 17.8977 7.68395 16.9643 7.68395 15.9999C7.68395 15.0354 7.85849 14.1021 8.1442 13.231L8.13621 
                                13.0455L3.67126 9.64734L3.52518 9.71544C2.55696 11.6132 2.0014 13.7444 2.0014 15.9999C2.0014 18.2555 2.55696 20.3865 
                                3.52518 22.2843L8.16007 18.7688Z" fill="#FBBC05"/>
                                <path d="M16.2863 7.4133C18.9688 7.4133 20.7783 8.54885 21.8101 9.4978L25.8418 5.64C23.3657 3.38445 20.1434 2 16.2863 
                                2C10.699 2 5.87354 5.1422 3.52435 9.71549L8.14339 13.2311C9.30223 9.85555 12.5086 7.4133 16.2863 7.4133Z" fill="#EB4335"/>
                            </svg>
                            Register with Google+
                        </button>
                        <button className="registration-socialButton-instagram">
                            <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint0_radial_510_10271)"/>
                                <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint1_radial_510_10271)"/>
                                <rect x="2" y="2" width="28" height="28" rx="6" fill="url(#paint2_radial_510_10271)"/>
                                <path d="M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z" fill="white"/>
                                <path fillRule="evenodd" clipRule="evenodd" d="M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z" fill="white"/>
                                <defs>
                                <radialGradient id="paint0_radial_510_10271" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 23) rotate(-55.3758) scale(25.5196)">
                                <stop stopColor="#B13589"/>
                                <stop offset="0.79309" stopColor="#C62F94"/>
                                <stop offset="1" stopColor="#8A3AC8"/>
                                </radialGradient>
                                <radialGradient id="paint1_radial_510_10271" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11 31) rotate(-65.1363) scale(22.5942)">
                                <stop stopColor="#E0E8B7"/>
                                <stop offset="0.444662" stopColor="#FB8A2E"/>
                                <stop offset="0.71474" stopColor="#E2425C"/>
                                <stop offset="1" stopColor="#E2425C" stopOpacity="0"/>
                                </radialGradient>
                                <radialGradient id="paint2_radial_510_10271" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)">
                                <stop offset="0.156701" stopColor="#406ADC"/>
                                <stop offset="0.467799" stopColor="#6A45BE"/>
                                <stop offset="1" stopColor="#6A45BE" stopOpacity="0"/>
                                </radialGradient>
                                </defs>
                            </svg>
                            Register with Instagram
                        </button>
                    </div>
                    <div className="registration-divider">OR</div>
                    <h3 className="registration-section-title">Profile Picture</h3>
                    <div className="registration-upload">
                        <div className="registration-upload-image">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_19824)">
                                    <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01"/>
                                    <path d="M12.0303 5L12.012 19" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5 12H19" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_2_19824">
                                        <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            <p>Upload Image</p>
                        </div>
                    </div>
                    <div className="registration-form-container">
                        <div className="registration-form">
                            <h2>Personal Information</h2>
                            <div className="registration-form-group">
                                <label>First Name</label>
                                <input type="text" />
                            </div>
                            <div className="registration-form-group">
                                <label>Last Name</label>
                                <input type="text" />
                            </div>
                            <div className="registration-form-group">
                                <label>Email Address</label>
                                <input type="email" />
                            </div>
                            <div className="registration-form-group">
                                <label>Mobile Number</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div className="registration-form">
                            <h2>Address Information</h2>
                            <div className="registration-form-group">
                                <label>Street</label>
                                <input type="text" />
                            </div>
                            <div className="registration-form-group">
                                <label>Area</label>
                                <input type="text" />
                            </div>
                            <div className="registration-form-group">
                                <label>Emirate</label>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                    <button className="registration-button">Register</button>
                </div>
            </section>
        </>
    )
}