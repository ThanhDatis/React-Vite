import React, { useCallback, useState, } from 'react';
import { 
    styled,
    alpha,
    InputBase,
    Box,
    Paper,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ClickAwayListener,
    Fade,
    Divider,
    Chip,
    Typography,
} from '@mui/material';
import {
    Search as SearchIcon,
    Close as CloseIcon,
    History,
    TrendingUp,
    Category
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': { 
        backgroundColor: alpha(theme.palette.common.white, 0.25) 
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': { 
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
        width: '20ch',
        '&:focus': {
        width: '30ch',
        },
    },
    },
}));

const SearchSuggestions = styled(Paper)(({ theme }) => ({
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: theme.spacing(1),
    maxHeight: 400,
    overflow: 'auto',
    zIndex: theme.zIndex.modal,
    minWidth: 300,
    [theme.breakpoints.up('md')]: {
        minWidth: 400
    },
}));

const TRENDING_SEARCHES = ['skincare routine', 'vitamin c serum', 'retinol cream'];
const POPULAR_CATEGORIES = ['Face Masks', 'Moisturizers', 'Cleansers'];

/**
 * SearchBar Component
 * @param {function} onSearch - Search handler
 * @param {array} recentSearches - Array of recent searches
 * @param {array} suggestions - Array of search suggestions
 * @param {boolean} showSuggestions - Whether to show suggestions
 * @param {string} placeholder - Search placeholder text
 */

export const SearchBar = ({
    onSearch,
    recentSearches = [],
    suggestions = [],
    showSuggestions = true,
    placeholder = 'Search for products',
    sx = {}

}) => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSearch = useCallback((e) => {
        e?.preventDefault();
        if (searchValue.trim()) {
            if (onSearch) {
                onSearch(searchValue);  
            } else {
                navigate(`/search?q=${encodeURIComponent(searchValue)}`);
            }
            setShowDropdown(false)
            setSearchValue('');
        }
    }, [searchValue, onSearch, navigate]);

    const handleSearchChange = useCallback((e) => {
        const value = e.target.value;
        setSearchValue(value);
        setShowDropdown(value.length > 0 || isFocused);
    }, [isFocused]);

    const handleFocus = useCallback(() => {
        setIsFocused(true);
        setShowDropdown(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
        setTimeout(() => {
            if (!isFocused) {
                setShowDropdown(false);
            }
        }, 200);
    }, [isFocused]);

    const handleSuggestionClick = useCallback((suggestion) => {
        setSearchValue(suggestion);
        handleSearch();
    }, [handleSearch]);

    const handleClear = useCallback(() => {
        setSearchValue('');
        setShowDropdown(false);
    }, []);

    const filteredSuggestions = suggestions.filter(item =>
        item.toLowerCase().includes(searchValue.toLowerCase())
    );

    const shouldShowDropdown = showDropdown && showSuggestions && (
        searchValue.length > 0 ||
        recentSearches.length > 0 ||
        TRENDING_SEARCHES.length > 0
    );

    return (
        <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
            <Search sx={sx}>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                
                <form onSubmit={handleSearch}>
                    <StyledInputBase
                        placeholder={placeholder}
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchValue}
                        onChange={handleSearchChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />
                </form>

                {searchValue && (
                    <IconButton
                        size="small"
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                        onClick={handleClear}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                )}

                <Fade in={shouldShowDropdown}>
                    <SearchSuggestions elevation={3}>
                        {/* Search Results */}
                        {searchValue && filteredSuggestions.length > 0 && (
                            <>
                                <Typography 
                                    variant="caption" 
                                    sx={{ p: 2, pb: 1, display: 'block', fontWeight: 600 }}
                                >
                                    Suggestions
                                </Typography>
                                <List dense>
                                    {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                                        <ListItem 
                                            key={index}
                                            button
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            <ListItemIcon>
                                                <SearchIcon fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText 
                                                primary={suggestion}
                                                primaryTypographyProps={{
                                                    sx: { fontSize: '14px' }
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                                <Divider />
                            </>
                        )}

                        {/* Recent Searches */}
                        {!searchValue && recentSearches.length > 0 && (
                            <>
                                <Typography 
                                    variant="caption" 
                                    sx={{ p: 2, pb: 1, display: 'block', fontWeight: 600 }}
                                >
                                    Recent Searches
                                </Typography>
                                <List dense>
                                    {recentSearches.slice(0, 3).map((search, index) => (
                                        <ListItem 
                                            key={index}
                                            button
                                            onClick={() => handleSuggestionClick(search)}
                                        >
                                            <ListItemIcon>
                                                <History fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText 
                                                primary={search}
                                                primaryTypographyProps={{
                                                    sx: { fontSize: '14px' }
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                                <Divider />
                            </>
                        )}

                        {/* Trending Searches */}
                        {!searchValue && (
                            <>
                                <Typography 
                                    variant="caption" 
                                    sx={{ p: 2, pb: 1, display: 'block', fontWeight: 600 }}
                                >
                                    Trending
                                </Typography>
                                <List dense>
                                    {TRENDING_SEARCHES.map((trend, index) => (
                                        <ListItem 
                                            key={index}
                                            button
                                            onClick={() => handleSuggestionClick(trend)}
                                        >
                                            <ListItemIcon>
                                                <TrendingUp fontSize="small" color="primary" />
                                            </ListItemIcon>
                                            <ListItemText 
                                                primary={trend}
                                                primaryTypographyProps={{
                                                    sx: { fontSize: '14px' }
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>

                                {/* Popular Categories */}
                                <Typography 
                                    variant="caption" 
                                    sx={{ p: 2, pb: 1, pt: 1, display: 'block', fontWeight: 600 }}
                                >
                                    Popular Categories
                                </Typography>
                                <Box sx={{ p: 1, pt: 0 }}>
                                    {POPULAR_CATEGORIES.map((category, index) => (
                                        <Chip
                                            key={index}
                                            label={category}
                                            size="small"
                                            onClick={() => navigate(`/category/${category.toLowerCase()}`)}
                                            sx={{ 
                                                m: 0.5,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: 'primary.main',
                                                    color: 'white'
                                                }
                                            }}
                                        />
                                    ))}
                                </Box>
                            </>
                        )}
                    </SearchSuggestions>
                </Fade>
            </Search>
        </ClickAwayListener>
    );
}