import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';


export default function FooterContent() {
    // Dữ liệu Footer
    const footerData = {
        mainPages: [
            { id: 1, title: "Sell with US" },
            { id: 2, title: "About US" },
            { id: 3, title: "Contact US" },
            { id: 4, title: "Promos" },
            { id: 5, title: "Become an Ambassador" },
        ],
        policy: [
            { id: 1, title: "Terms of Usage" },
            { id: 2, title: "Privacy Policy" },
            { id: 3, title: "Return Policy" },
        ],
        categories: [
            { id: 1, title: "Skincare", path: "/skincare" },
            { id: 2, title: "Makeup", path: "/makeup" },
            { id: 3, title: "Hair Care", path: "/haircare" },
            { id: 4, title: "Bath & Body", path: "/bath-body" },
            { id: 5, title: "Beauty Supplements", path: "/fragrance" },
        ],
        socialIcons: [
            {
                id: 1,
                name: "Facebook",
                svg: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="16" cy="16" r="14" fill="black"/>
                        <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 
                        11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 
                        29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"/>
                        <defs>
                        <linearGradient id="paint0_linear_510_10262" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#18ACFE"/>
                        <stop offset="1" stopColor="#0163E0"/>
                        </linearGradient>
                        </defs>
                    </svg>
                )
            },
            {
                id: 2,
                name: "Twitter",
                svg: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7887 28C8.55374 28 5.53817 27.0591 3 25.4356C5.15499 25.5751 8.95807 25.2411 11.3236 
                        22.9848C7.76508 22.8215 6.16026 20.0923 5.95094 18.926C6.25329 19.0426 7.6953 19.1826 8.50934 18.856C4.4159 
                        17.8296 3.78793 14.2373 3.92748 13.141C4.695 13.6775 5.99745 13.8641 6.50913 13.8174C2.69479 11.0882 4.06703 
                        6.98276 4.74151 6.09635C7.47882 9.88867 11.5812 12.0186 16.6564 12.137C16.5607 11.7174 16.5102 11.2804 16.5102 
                        10.8316C16.5102 7.61092 19.1134 5 22.3247 5C24.0025 5 25.5144 5.71275 26.5757 6.85284C27.6969 6.59011 29.3843 
                        5.97507 30.2092 5.4432C29.7934 6.93611 28.4989 8.18149 27.7159 8.64308C27.7095 8.62731 27.7224 8.65878 27.7159 
                        8.64308C28.4037 8.53904 30.2648 8.18137 31 7.68256C30.6364 8.52125 29.264 9.91573 28.1377 10.6964C28.3473 19.9381 
                        21.2765 28 11.7887 28Z" fill="black"/>
                    </svg>
                )
            },
            {
                id: 3,
                name: "YouTube",
                svg: (
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.24451 9.94111C2.37304 7.96233 3.96395 6.41157 5.94447 6.31345C8.81239 6.17136 12.9115 6 16 6C19.0885 
                        6 23.1876 6.17136 26.0555 6.31345C28.0361 6.41157 29.627 7.96233 29.7555 9.94111C29.8786 11.8369 30 14.1697 30 
                        16C30 17.8303 29.8786 20.1631 29.7555 22.0589C29.627 24.0377 28.0361 25.5884 26.0555 25.6866C23.1876 25.8286 19.0885 
                        26 16 26C12.9115 26 8.81239 25.8286 5.94447 25.6866C3.96395 25.5884 2.37304 24.0377 2.24451 22.0589C2.12136 20.1631 2 
                        17.8303 2 16C2 14.1697 2.12136 11.8369 2.24451 9.94111Z" fill="black"/>
                        <path d="M13 12V20L21 16L13 12Z" fill="white"/>
                    </svg>
                )
            }
        ]
    };

    // Component tái sử dụng cho danh sách footer
    const FooterList = ({ title, items }) => (
        <div className="footerItem">
            <h3>{title.toUpperCase()}</h3>
            <ul className="footerList">
                {items.map((item) => (
                    <li key={item.id} className="footerListItem">
                        {title === "categories" ? (
                            <Link
                                to={item.path || `/category/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                                style={{ color: 'inherit', textDecoration: 'none' }}
                            >
                                {item.title}
                            </Link>
                        ) : (
                            <Link
                                to={`/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                                style={{ color: 'inherit', textDecoration: 'none' }}
                            >
                                {item.title}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

    // Component tái sử dụng cho social icons
    const SocialIcons = ({ icons }) => (
        <div className="footerSocialIcons">
            {icons.map(icon => (
                <a key={icon.id} href="#" aria-label={icon.name}>
                    {icon.svg}
                </a>
            ))}
        </div>
    );

    return (
        <footer>
            <div className="footerContainer">
                <div className="footerGridItem">
                    <div className="footerItem">
                        <div className="footerLogo">YOUR LOGO</div>
                        <SocialIcons icons={footerData.socialIcons} />
                    </div>
                    
                    <FooterList title="main pages" items={footerData.mainPages} />
                    <FooterList title="policy" items={footerData.policy} />
                    <FooterList title="categories" items={footerData.categories} />
                    
                    <div className="footerItem">
                        <h3>subscribe</h3>
                        <p>Subscribe to our newsletter, so that you can be the first to know about new offers and promotions.</p>
                        <form className="subscriptionForm">
                            <input type="email" placeholder="Enter email address" className="emailInput" />
                            <button type="submit" className="subscribeButton">SUBSCRIBE</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footerBottom">
                <p>© 2025 Your Company. All rights reserved.</p>
                <div className="footerBottomIcons">
                    <a href="#" className="footerBottomIcon">
                        <svg width="46" height="32" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="45" height="31" rx="5.5" fill="white"/>
                            <rect x="0.5" y="0.5" width="45" height="31" rx="5.5" stroke="#F2F4F7"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M22.9053 22.4392C21.3266 23.77 19.2787 24.5733 17.0409 24.5733C12.0478 
                            24.5733 8 20.5737 8 15.64C8 10.7062 12.0478 6.70663 17.0409 6.70663C19.2787 6.70663 21.3266 7.50997 22.9053 8.84069C24.484 
                            7.50997 26.5319 6.70663 28.7697 6.70663C33.7628 6.70663 37.8106 10.7062 37.8106 15.64C37.8106 20.5737 33.7628 24.5733 
                            28.7697 24.5733C26.5319 24.5733 24.484 23.77 22.9053 22.4392Z" fill="#ED0006"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M22.9053 22.4392C24.8492 20.8007 26.0818 18.3626 26.0818 15.64C26.0818 
                            12.9174 24.8492 10.4792 22.9053 8.84069C24.484 7.50996 26.5319 6.70663 28.7697 6.70663C33.7628 6.70663 37.8106 10.7062 
                            37.8106 15.64C37.8106 20.5737 33.7628 24.5733 28.7697 24.5733C26.5319 24.5733 24.484 23.77 22.9053 22.4392Z" fill="#F9A000"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M22.9053 22.4392C24.8492 20.8007 26.0818 18.3626 26.0818 15.64C26.0818 12.9174 
                            24.8492 10.4793 22.9053 8.84073C20.9614 10.4793 19.7288 12.9174 19.7288 15.64C19.7288 18.3626 20.9614 20.8007 22.9053 22.4392Z" fill="#FF5E00"/>
                        </svg>
                        <svg width="46" height="32" viewBox="0 0 46 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="45" height="31" rx="5.5" fill="white"/>
                            <rect x="0.5" y="0.5" width="45" height="31" rx="5.5" stroke="#F2F4F7"/>
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.3337 21.1443H11.5874L9.52795 13.0565C9.4302 12.6844 9.22265 
                            12.3555 8.91736 12.2005C8.15546 11.811 7.3159 11.5009 6.40001 11.3446V11.0332H10.8241C11.4347 11.0332 11.8927 
                            11.5009 11.969 12.0442L13.0375 17.8782L15.7825 11.0332H18.4525L14.3337 21.1443ZM19.979 21.1443H17.3853L19.521 
                            11.0332H22.1147L19.979 21.1443ZM25.4703 13.8343C25.5466 13.2897 26.0045 12.9783 26.5388 12.9783C27.3784 12.9001 
                            28.2929 13.0565 29.0562 13.4447L29.5141 11.2677C28.7509 10.9564 27.9113 10.8 27.1494 10.8C24.6321 10.8 22.8003 
                            12.2005 22.8003 14.1443C22.8003 15.623 24.0978 16.3995 25.0137 16.8672C26.0045 17.3336 26.3862 17.645 26.3098 
                            18.1114C26.3098 18.811 25.5466 19.1224 24.7847 19.1224C23.8688 19.1224 22.9529 18.8892 22.1147 18.4996L21.6568 
                            20.6779C22.5726 21.0661 23.5635 21.2225 24.4794 21.2225C27.302 21.2993 29.0562 19.9001 29.0562 17.8C29.0562 15.1553 
                            25.4703 15.0003 25.4703 13.8343ZM38.1333 21.1443L36.0739 11.0332H33.8619C33.4039 11.0332 32.946 11.3446 32.7933 
                            11.811L28.9798 21.1443H31.6498L32.1828 19.6669H35.4633L35.7686 21.1443H38.1333ZM34.2435 13.7561L35.0054 17.5668H32.8697L34.2435 
                            13.7561Z" fill="#172B85"/>
                        </svg>
                    </a>
                </div>
            </div>
        </footer>
    );
} 