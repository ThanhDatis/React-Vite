 import React, { useState, useCallback, useMemo } from 'react';
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
    CircularProgress
} from '@mui/material';
import { ExpandMore, Search as SearchIcon } from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// ==================== STYLED COMPONENTS ====================

const NAVIGATION_THEME = {
    colors: {
        primary: '#333333',
        hover: 'rgba(0, 0, 0, 0.04)',
        primaryAlpha: (alpha) => `rgba(51, 51, 51, ${alpha})`,
        text: {
            primary: '#333333',
            secondary: '#666666',
            disabled: '#999999'
        }
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
    },
    transitions: {
        fast: '0.2s ease',
        medium: '0.3s ease',
        slow: '0.4s ease',
    },
    breakpoints: {
        mobile: 'md'
    }
};
const StyledNavButton = styled(Button)(({ theme }) => ({
    color: NAVIGATION_THEME.colors.primary,
    fontWeight: 'bold',
    fontSize: '16px',
    padding: `${NAVIGATION_THEME.spacing.sm} ${NAVIGATION_THEME.spacing.md}`,
    textTransform: 'uppercase',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 0,
    transition: `all ${NAVIGATION_THEME.transitions.medium}`,
    
    '&:hover': {
        backgroundColor: NAVIGATION_THEME.colors.hover,
    },
    
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        width: 0,
        height: '2px',
        backgroundColor: NAVIGATION_THEME,
        transform: 'translateX(-50%)',
        transformOrigin: 'center',
        transition: 'width 0.3s ease-in-out',
    },
    
    '&:hover::after': {
        width: '80%',
    },
    
    '&.active::after': {
        // width: '100%',
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
        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
    },
}));

const SearchField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: alpha(theme.palette.common.black, 0.03),
        borderRadius: theme.spacing(1),
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.black, 0.05),
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main,
            },
        },
    },
    '& .MuiInputBase-input': {
        fontSize: '14px',
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
    '&:not(:last-child)': {
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
    },
}));

const GroupTitle = styled(Typography)(({ theme }) => ({
    fontSize: '12px',
    fontWeight: 700,
    color: theme.palette.text.secondary,
    textTransform: 'uppercase',
    padding: theme.spacing(1, 2),
    letterSpacing: '0.5px',
    backgroundColor: alpha(theme.palette.grey[100], 0.5),
    margin: theme.spacing(0, 1),
    borderRadius: theme.spacing(0.5)
}));

// ==================== NAVIGATION ITEM COMPONENT ====================
/**
 * Navigation Item Component
 * @param {object} item - Navigation item object with label and path
 * @param {boolean} isActive - Whether the item is currently active
 * @param {function} onClick - Click handler
 */
export const NavigationItem = React.memo(({ 
    item, 
    isActive = false, 
    onClick,
    sx = {} 
}) => {
    const handleClick = useCallback((e) => {
        if (onClick) {
            onClick(item, e);
        }
    }, [item, onClick]);

    return (
        <StyledNavButton
            component={Link}
            to={item.path}
            className={isActive ? 'active' : ''}
            onClick={handleClick}
            aria-current={isActive ? 'page' : undefined}
            sx={sx}
        >
            {item.label}
        </StyledNavButton>
    );
});

NavigationItem.displayName = 'NavigationItem';

const useActiveNavigation = () => {
    const location = useLocation();
    return location.pathname;
};

const useBrandSearch = (brands, minSearchLength = 2) => {
    const [searchValue, setSearchValue] = useState('');
    
    const filteredBrands = useMemo(() => {
        if (searchValue.length < minSearchLength) return brands;
        return brands.filter(brand =>
            brand.toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [brands, searchValue, minSearchLength]);

    const clearSearch = useCallback(() => {
        setSearchValue('');
    }, []);

    return {
        searchValue,
        setSearchValue,
        filteredBrands,
        clearSearch,
        hasSearch: searchValue.length >= minSearchLength,
    };
};
// ==================== NAVIGATION BAR COMPONENT ====================
/**
 * Navigation Bar Component
 * @param {array} items - Array of navigation items
 * @param {string} currentPath - Current active path
 * @param {function} onItemClick - Item click handler
 */
export const NavigationBar = React.memo(({ 
    items = [], 
    currentPath,
    onItemClick,
    sx = {} 
}) => {
    const activePath = useActiveNavigation();
    const activePathToUse = currentPath || activePath;

    return (
        <Box
            component="nav"
            role="navigation"
            aria-label="Main navigation"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, ...sx }}
        >
            {items.map((item) => (
                <NavigationItem
                    key={item.path}
                    item={item}
                    isActive={activePathToUse === item.path}
                    onClick={onItemClick}
                />
            ))}
        </Box>
    );
});

NavigationBar.displayName = 'NavigationBar';

// ==================== BRAND MENU COMPONENT ====================
/**
 * BrandMenu Component
 * @param {array} brands - Array of brand names or objects
 * @param {boolean} groupByLetter - Whether to group brands by first letter
 * @param {boolean} showSearch - Whether to show search field
 * @param {function} onBrandSelect - Brand selection handler
 */
// ==================== ENHANCED BRAND MENU COMPONENT ====================
/**
 * Enhanced BrandMenu Component with improved UX
 */
export const BrandMenu = React.memo(({ 
    brands = [],
    groupByLetter = false,
    showSearch = true,
    onBrandSelect,
    buttonProps = {},
    menuProps = {},
    isLoading = false,
    buttonText = "ALL BRANDS"
}) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const { 
        searchValue, 
        setSearchValue, 
        filteredBrands, 
        clearSearch,
        hasSearch 
    } = useBrandSearch(brands, 1);
    
    const open = Boolean(anchorEl);

    // Auto-enable search for large brand lists
    const shouldShowSearch = showSearch && brands.length > 8;
    // Auto-enable grouping for very large lists
    const shouldGroupByLetter = groupByLetter || brands.length > 25;

    // Handlers
    const handleOpen = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    }, []);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
        clearSearch();
    }, [clearSearch]);

    const handleBrandClick = useCallback((brand) => {
        if (onBrandSelect) {
            onBrandSelect(brand);
        } else {
            navigate(`/brands/${brand.toLowerCase().replace(/\s+/g, '-')}`);
        }
        handleClose();
    }, [onBrandSelect, navigate, handleClose]);

    const handleViewAllBrands = useCallback(() => {
        navigate('/brands');
        handleClose();
    }, [navigate, handleClose]);

    // Group brands by first letter if requested
    const groupedBrands = useMemo(() => {
        if (!shouldGroupByLetter) {
            return { '': filteredBrands };
        }

        return filteredBrands.reduce((acc, brand) => {
            const firstLetter = brand[0].toUpperCase();
            if (!acc[firstLetter]) {
                acc[firstLetter] = [];
            }
            acc[firstLetter].push(brand);
            return acc;
        }, {});
    }, [filteredBrands, shouldGroupByLetter]);

    // Sort grouped brands alphabetically
    const sortedGroupEntries = useMemo(() => {
        return Object.entries(groupedBrands).sort(([a], [b]) => a.localeCompare(b));
    }, [groupedBrands]);

    // Transform expand icon
    const expandIconTransform = useMemo(() => ({
        transition: 'transform 0.3s ease',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    }), [open]);

    return (
        <>
            <Button
                onClick={handleOpen}
                endIcon={isLoading ? <CircularProgress size={16} /> : <ExpandMore sx={expandIconTransform} />}
                disabled={isLoading}
                sx={{
                    color: '#333333',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    padding: '8px 16px',
                    textTransform: 'uppercase',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                    '&:disabled': {
                        color: 'text.disabled',
                    },
                    ...buttonProps.sx,
                }}
                aria-haspopup="true"
                aria-expanded={open}
                {...buttonProps}
            >
                {buttonText}
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
                {shouldShowSearch && (
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
                        {hasSearch && (
                            <Typography variant="caption" sx={{ mt: 1, display: 'block', color: 'text.secondary' }}>
                                {filteredBrands.length} brand{filteredBrands.length !== 1 ? 's' : ''} found
                            </Typography>
                        )}
                    </Box>
                )}

                {/* Brands List */}
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                    {sortedGroupEntries.length > 0 ? (
                        sortedGroupEntries.map(([letter, brandList]) => (
                            <BrandGroup key={letter || 'ungrouped'}>
                                {shouldGroupByLetter && letter && (
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
                        ))
                    ) : (
                        /* No results message */
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                {hasSearch ? 'No brands found' : 'No brands available'}
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Footer - View all brands link */}
                {brands.length > 10 && (
                    <Box
                        sx={{
                            borderTop: 1,
                            borderColor: 'divider',
                            p: 1.5,
                            textAlign: 'center',
                        }}
                    >
                        <Button
                            size="small"
                            onClick={handleViewAllBrands}
                            sx={{ 
                                textTransform: 'none',
                                fontWeight: 500,
                            }}
                        >
                            View all {brands.length} brands
                        </Button>
                    </Box>
                )}
            </StyledMenu>
        </>
    );
});

BrandMenu.displayName = 'BrandMenu';

// ==================== SELL WITH US COMPONENT ====================
/**
 * SellWithUs Component
 * @param {function} onClick - Click handler
 * @param {object} sx - Additional styles
 */
export const SellWithUs = React.memo(({ 
    onClick, 
    sx = {},
    href = '/sell-with-us',
    variant = 'filled' // 'filled' | 'outlined'
}) => {
    const navigate = useNavigate();
    
    const handleClick = useCallback(() => {
        if (onClick) {
            onClick();
        } else {
            navigate(href);
        }
    }, [onClick, navigate, href]);

    return (
        <Chip
            label="SELL WITH US"
            onClick={handleClick}
            variant={variant}
            sx={{
                backgroundColor: variant === 'filled' ? '#333333' : 'transparent',
                color: variant === 'filled' ? 'white' : '#333333',
                border: variant === 'outlined' ? '1px solid #333333' : 'none',
                fontWeight: 'bold',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                    backgroundColor: variant === 'filled' ? '#555555' : 'rgba(51, 51, 51, 0.04)',
                    transform: 'translateY(-1px)',
                },
                '&:active': {
                    transform: 'translateY(0)',
                },
                ...sx
            }}
            role="button"
            tabIndex={0}
        />
    );
});

SellWithUs.displayName = 'SellWithUs';

// ==================== COMPLETE NAVIGATION COMPONENT ====================
/**
 * Complete Navigation Component - Combines all navigation elements
 * @param {array} brands - Array of brands
 * @param {array} navItems - Array of navigation items
 * @param {string} currentPath - Current active path
 * @param {object} handlers - Event handlers object
 */
export const CompleteNavigation = React.memo(({ 
    brands = [], 
    navItems = [], 
    currentPath,
    handlers = {},
    showSellWithUs = true,
    brandMenuProps = {},
    navigationProps = {},
    sellWithUsProps = {},
    sx = {}
}) => {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                gap: 2,
                ...sx 
            }}
        >
            {/* Left side - Brands and Navigation */}
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 1, md: 2 },
                flex: 1 
            }}>
                {brands.length > 0 && (
                    <BrandMenu
                        brands={brands}
                        onBrandSelect={handlers?.handleBrandClick}
                        {...brandMenuProps}
                    />
                )}
                
                {navItems.length > 0 && (
                    <NavigationBar
                        items={navItems}
                        currentPath={currentPath}
                        onItemClick={handlers?.handleNavClick}
                        {...navigationProps}
                    />
                )}
            </Box>

            {/* Right side - Sell with us */}
            {showSellWithUs && (
                <SellWithUs 
                    onClick={handlers?.handleSellWithUs} 
                    {...sellWithUsProps}
                />
            )}
        </Box>
    );
});

CompleteNavigation.displayName = 'CompleteNavigation';