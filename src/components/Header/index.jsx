import React from 'react';
import HeaderTopBar from './HeaderTopBar';
import HeaderNavBar from './HeaderNavBar';
import UserDropdown from '../UserDropdown/UserDropdown';

const Header = () => {
    return (
        <header className="header">
            <HeaderTopBar />
            <HeaderNavBar />
        </header>
    );
};

export default Header; 