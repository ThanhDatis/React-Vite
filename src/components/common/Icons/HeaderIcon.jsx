import React from 'react';
import { 
    Box, 
    IconButton,
    Typography,
} from '@mui/material';
import { 
    Language, 
    Person, 
    ShoppingCart, 
    Search as SearchIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

 // eslint-disable-next-line no-unused-vars
 const BaseHeaderIcon = ({ icon: Icon, label, onClick, to, sx = {}, ...props }) => {
    const button = (
        <IconButton
            onClick={onClick}
            sx={{
                display: 'flex',
                gap: 1,
                alignItems: 'center',
                color: '#333333',
                padding: '8px',
                borderRadius: '8px',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    transform: 'translateY(-1px)',
                },
                '&:active': {
                    transform: 'translateY(0)',
                },
                ...sx
            }}
            {...props}
        >
            <Icon />
            {label && (
                <Typography
                    variant='caption'
                    sx={{
                        fontSize: '16px',
                        fontWeight: 600,
                        display: { xs: 'none', sm: 'block' },
                    }}
                >
                    {label}
                </Typography>
            )}
        </IconButton>
    );

    if (to) {
        return (
            <Link to={to} style={{ textDecoration: 'none' }}>
                {button}
            </Link>
        );
    }
    return button;
 };

 export const CartIcon = ({ onClick, to = "/cart", cartCount = 0 }) => {
    return (
        <Box sx={{ position: 'relative' }}>
            <BaseHeaderIcon 
                icon={ShoppingCart}
                label="Cart"
                onClick={onClick}
                to={to}
                aria-label={`Shopping cart with ${cartCount} items`}
            />
            {cartCount > 0 && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'error.main',
                        color: 'white',
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: 12,
                        fontWeight: 'bold',
                        border: '2px solid white',
                    }}
                >
                    {cartCount > 99 ? '99+' : cartCount}
                </Box>
            )}
        </Box> 
    );
 };

 export const UserIcon = ({ onClick, userName = "User", isLoggedIn = false }) => {
    return (
        <BaseHeaderIcon 
            icon={Person}
            label={userName}
            onClick={onClick}
            aria-label={ isLoggedIn ? `User profile for ${userName}` : `Sign in` }
            aria-haspopup="true"
        />
    );
 };

 export const LanguageIcon = ({ onClick, currentLang = "EN" }) => {
    return (
        <BaseHeaderIcon 
            icon={Language}
            label={currentLang}
            onClick={onClick}
            aria-label="Change language"
            aria-haspopup="true"
        />
    );
 };

 export const MobileSearchIcon = ({ onClick }) => {
    return (
        <BaseHeaderIcon 
            icon={SearchIcon}
            onClick={onClick}
            aria-label="Search"
            sx={{
                display: { xs: 'flex', md: 'none' },
            }}
        />
    );
 };

 export const Separator = ({
    width = 1,
    height = 24,
    color = '#333333',
    opacity = 0.8,
    // my = 0,
    mx = 0,
    orientation = 'vertical',
 }) => {
    return (
        <Box 
            component= "span"
            sx={{
                display: 'block',
                width: orientation === 'vertical' ? width : width,
                height: orientation === 'vertical' ? height : height,
                backgroundColor: color,
                opacity: opacity,
                // my: my,
                mx: mx,
                flexShrink: 0,
            }}
            role='separator'
            aria-orientation={orientation}
        />
    );
 };

 export const HeaderIconGroup = ({ children, sx = {} }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ...sx }}>
            {React.Children.map(children, (child, index) => (
                <React.Fragment key={index}>
                {child}
                {index < React.Children.count(children) - 1 && 
                    child.type !== Separator &&
                    React.Children.toArray(children)[index + 1].type !== Separator && (
                        <Separator/>
                )}
            </React.Fragment>
        ))}
        </Box>
    );
 };