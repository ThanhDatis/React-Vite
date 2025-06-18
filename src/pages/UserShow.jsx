import React from 'react';
import userAvatar from '../assets/images/image.png';

export default function UserShow() {
    // Dữ liệu người dùng (có thể lấy từ API trong thực tế)
    const users = [
        { id: 1, name: "Name Surname", username: "@username" },
        { id: 2, name: "Name Surname", username: "@username" },
        { id: 3, name: "Name Surname", username: "@username" },
        { id: 4, name: "Name Surname", username: "@username" }
    ];
    
    // Component tái sử dụng cho UserCard
    const UserCard = ({ user }) => (
        <div className="userCard">
            <div className="userAvatar">
                <img src={userAvatar} alt={user.name} />
            </div>
            <h2 className="userName">{user.name}</h2>
            <div className="userUsername">{user.username}</div>
            <div className="userSocialIcons">
                <a href="#" aria-label="Facebook">
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
                </a>
                <a href="#" aria-label="Twitter">
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
                </a>
                <a href="#" aria-label="YouTube">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.24451 9.94111C2.37304 7.96233 3.96395 6.41157 5.94447 6.31345C8.81239 6.17136 12.9115 6 16 6C19.0885 
                        6 23.1876 6.17136 26.0555 6.31345C28.0361 6.41157 29.627 7.96233 29.7555 9.94111C29.8786 11.8369 30 14.1697 30 
                        16C30 17.8303 29.8786 20.1631 29.7555 22.0589C29.627 24.0377 28.0361 25.5884 26.0555 25.6866C23.1876 25.8286 19.0885 
                        26 16 26C12.9115 26 8.81239 25.8286 5.94447 25.6866C3.96395 25.5884 2.37304 24.0377 2.24451 22.0589C2.12136 20.1631 2 
                        17.8303 2 16C2 14.1697 2.12136 11.8369 2.24451 9.94111Z" fill="black"/>
                        <path d="M13 12V20L21 16L13 12Z" fill="white"/>
                    </svg>
                </a>
            </div>
            <button className="userShopButton">SHOP WITH ME</button>
        </div>
    );

    // Component tái sử dụng cho UserSection
    const UserSection = ({ title, seeAllText }) => (
        <section className="sectionUserShowCase">
            <div className="sectionUserHeader">
                <h2 className="sectionTitle">{title}</h2>
                <a className="sectionSeeAll" href="">{seeAllText}</a>
            </div>
            <div className="sectionUserContainer">
                <div className="userGrid">
                    {users.map(user => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            </div>
        </section>
    );

    return (
        <>
            <UserSection title="AMBASSADORS" seeAllText="See all" />
            {/* <UserSection title="TOP INFLUENCERS" seeAllText="View more" /> */}
        </>
    );
}
