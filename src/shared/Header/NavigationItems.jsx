 
// src/components/layouts/Header/components/Shared/NavigationItems.jsx
import React, { useState } from 'react';
import {
    Button,
    Menu,
    MenuItem,
    Typography,
    Box,
    TextField,
    InputAdornment,
    Fade,
    styled,
    alpha,
    Chip,
} from '@mui/material';
import { ExpandMore, Search as SearchIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

// ==================== STYLED COMPONENTS ====================
const StyledNavButton = styled(Button)(({ theme }) => ({
    color: '#333333',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '8px 16px',
    textTransform: 'uppercase',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 0,
    transition: 'all 0.3s ease',
    
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        width: 0,
        height: '2px',
        backgroundColor: '#333333',
        transform: 'translateX(-50%)',
        transformOrigin: 'center',
        transition: 'width 0.3s ease-in-out',
    },
    
    '&:hover::after': {
        width: '80%',
    },
    
    '&.active::after': {
        width: '100%',
        backgroundColor: theme.palette.primary.main,
    },
    
    [theme.breakpoints.down('md')]: {
        fontSize: '14px',
        padding: '6px 12px',
    },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        marginTop: theme.spacing(1),
        minWidth: 280,
        maxHeight: 400,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        borderRadius: theme.spacing(1),
    },
}));

const SearchField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: alpha(theme.palette.common.black, 0.03),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.05),
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
        },
    },
}));

const BrandMenuItem = styled(MenuItem)(({ theme }) => ({
    padding: theme.spacing(1.5, 2),
    transition: 'all 0.3s ease',
    borderRadius: theme.spacing(0.5),
    margin: theme.spacing(0.5, 1),
    
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        transform: 'translateX(4px)',
    },
    
    '& .MuiTypography-root': {
        fontSize: '14px',
        fontWeight: 500,
    },
}));

const BrandGroup = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1, 0),
}));

const GroupTitle = styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    fontWeight: 700,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    padding: theme.spacing(1, 2),
    letterSpacing: '0.5px',
}));

// ==================== NAVIGATION ITEM COMPONENT ====================
/**
 * Navigation Item Component
 * @param {object} item - Navigation item object with label and path
 * @param {boolean} isActive - Whether the item is currently active
 * @param {function} onClick - Click handler
 */
export const NavigationItem = ({ item, isActive = false, onClick }) => {
    return (
        <StyledNavButton
            component={Link}
            to={item.path}
            className={isActive ? 'active' : ''}
            onClick={onClick}
            aria-current={isActive ? 'page' : undefined}
        >
            {item.label}
        </StyledNavButton>
    );
};

// ==================== NAVIGATION BAR COMPONENT ====================
/**
 * Navigation Bar Component
 * @param {array} items - Array of navigation items
 * @param {string} currentPath - Current active path
 * @param {function} onItemClick - Item click handler
 */
export const NavigationBar = ({ items, currentPath, onItemClick }) => {
    return (
        <nav role="navigation" aria-label="Main navigation">
            {items.map((item) => (
                <NavigationItem
                    key={item.path}
                    item={item}
                    isActive={currentPath === item.path}
                    onClick={() => onItemClick?.(item)}
                />
            ))}
        </nav>
    );
};

// ==================== BRAND MENU COMPONENT ====================
/**
 * BrandMenu Component
 * @param {array} brands - Array of brand names or objects
 * @param {boolean} groupByLetter - Whether to group brands by first letter
 * @param {boolean} showSearch - Whether to show search field
 * @param {function} onBrandSelect - Brand selection handler
 */
export const BrandMenu = ({ 
    brands = [],
    groupByLetter = false,
    showSearch = true,
    onBrandSelect,
    buttonProps = {},
    menuProps = {},
}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const open = Boolean(anchorEl);

    // Handlers
    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSearchValue('');
    };

    const handleBrandClick = (brand) => {
        if (onBrandSelect) {
            onBrandSelect(brand);
        } else {
            navigate(`/brands/${brand.toLowerCase()}`);
        }
        handleClose();
    };

    // Filter brands based on search
    const filteredBrands = brands.filter(brand =>
        brand.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Group brands by first letter if requested
    const groupedBrands = groupByLetter
        ? filteredBrands.reduce((acc, brand) => {
            const firstLetter = brand[0].toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(brand);
            return acc;
        }, {})
        : { '': filteredBrands };

    // Transform expand icon
    const expandIconTransform = {
        transition: 'transform 0.3s ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                endIcon={<ExpandMore sx={expandIconTransform} />}
                sx={{
                    color: '#333333',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                    textTransform: 'uppercase',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    ...buttonProps.sx,
                }}
                aria-haspopup="true"
                aria-expanded={open}
                {...buttonProps}
            >
                ALL BRANDS
            </Button>

            <StyledMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                MenuListProps={{
                    'aria-labelledby': 'brands-button',
                }}
                {...menuProps}
            >
                {/* Search Field */}
                {showSearch && brands.length > 10 && (
                    <Box sx={{ p: 2, pb: 1 }}>
                        <SearchField
                            fullWidth
                            size="small"
                            placeholder="Search brands..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                            autoFocus
                        />
                    </Box>
                )}

                {/* Brands List */}
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {Object.entries(groupedBrands).map(([letter, brandList]) => (
                        <BrandGroup key={letter}>
                            {groupByLetter && letter && (
                                <GroupTitle>{letter}</GroupTitle>
                            )}
                            {brandList.map((brand) => (
                                <BrandMenuItem
                                    key={brand}
                                    onClick={() => handleBrandClick(brand)}
                                >
                                    <Typography>{brand}</Typography>
                                </BrandMenuItem>
                            ))}
                        </BrandGroup>
                    ))}
                </Box>

                {/* No results message */}
                {filteredBrands.length === 0 && (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            No brands found
                        </Typography>
                    </Box>
                )}

                {/* View all brands link */}
                <Box
                    sx={{
                        borderTop: 1,
                        borderColor: 'divider',
                        p: 1,
                        textAlign: 'center',
                    }}
                >
                    <Button
                        size="small"
                        onClick={() => {
                            navigate('/brands');
                            handleClose();
                        }}
                        sx={{ textTransform: 'none' }}
                    >
                        View all brands
                    </Button>
                </Box>
            </StyledMenu>
        </>
    );
};

// ==================== SELL WITH US COMPONENT ====================
/**
 * SellWithUs Component
 * @param {function} onClick - Click handler
 * @param {object} sx - Additional styles
 */
export const SellWithUs = ({ onClick, sx = {} }) => {
    return (
        <Chip
            label="SELL WITH US"
            onClick={onClick}
            sx={{
                backgroundColor: '#333333',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: '#555555',
                },
                ...sx
            }}
        />
    );
};

// ==================== COMPLETE NAVIGATION COMPONENT ====================
/**
 * Complete Navigation Component - Combines all navigation elements
 * @param {array} brands - Array of brands
 * @param {array} navItems - Array of navigation items
 * @param {string} currentPath - Current active path
 * @param {object} handlers - Event handlers object
 */
export const CompleteNavigation = ({ 
    brands, 
    navItems, 
    currentPath,
    handlers,
    showSellWithUs = true,
    sx = {}
}) => {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                ...sx 
            }}
        >
            {/* Left side - Brands and Navigation */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <BrandMenu
                    brands={brands}
                    groupByLetter={brands.length > 20}
                    showSearch={brands.length > 10}
                    onBrandSelect={handlers?.handleBrandClick}
                />
                
                <NavigationBar
                    items={navItems}
                    currentPath={currentPath}
                    onItemClick={handlers?.handleNavClick}
                />
            </Box>

            {/* Right side - Sell with us */}
            {showSellWithUs && (
                <SellWithUs onClick={handlers?.handleSellWithUs} />
            )}
        </Box>
    );
};