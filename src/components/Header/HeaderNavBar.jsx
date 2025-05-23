import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function HeaderNavBar () {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="headerNavbar">
            <div className="headerNavbarMenu">
                <ul className="headerNavbarMenuList">
                    <div className="menuList-items-container">
                        <li className="menuList-item">ALL BRANDS
                            <svg className="menuList-itemSvg" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_21285)">
                                    <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01"/>
                                    <path d="M18.5 9L12.5 15L6.5 9" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_2_21285">
                                        <rect width="24" height="24" fill="none"/>
                                    </clipPath>
                                </defs>
                            </svg>
                        </li>
                        <li className="menuList-item">
                            <Link to="/skincare">SKINCARE</Link>
                        </li>
                        <li className="menuList-item">
                            <Link to="/makeup">MAKE UP</Link>
                        </li>
                        <li className="menuList-item">
                            <Link to="/haircare">HAIR CARE</Link>
                        </li>
                        <li className="menuList-item">
                            <Link to="/bath-body">BATH & BODY</Link>
                        </li>
                        <li className="menuList-item">
                            <Link to="/fragrance">BEAUTY SUPPLEMENTS</Link>
                        </li>
                        <li className="menuList-item">PROMOS</li>
                    </div>
                    <div className="headerNavbarSell">
                        <div className="headerNavSell-title">
                            <span>SELL WITH US</span>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    )
} 