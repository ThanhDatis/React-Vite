import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Box,
    Container,
    IconButton,
    Button,
    Menu,
    MenuItem,
    Typography,
    Chip,
    TextField,
    Alert,
    Popper,
    Paper,
    ClickAwayListener,
    MenuList,
    Fade,
    InputBase,
    styled,
    alpha,
} from '@mui/material';
import {
    ShoppingCart,
    Person,
    Language,
    Facebook,
    Google,
    AccountCircle,
    Logout,
    Search as SearchIcon,
    ExpandMore,
} from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
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
        },
    },
}));

const StyledToolbar = styled(Box)(() => ({
    padding: '0 !important',
    minHeight: '64px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
}));

const LoginForm = ({
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleLogin,
    onClose,
}) => (
    <Box sx={{ p: 3, width: '100%' }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
            SIGN IN
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleLogin}>
            <TextField
                fullWidth
                label="Username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ mb: 2 }}
                size="small"
            />

            <TextField
                fullWidth
                type="password"
                label="Password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 1 }}
                size="small"
            />

            <Box sx={{ textAlign: 'right', mb: 2 }}>
                <Button
                    component={Link}
                    to="/forgot-password"
                    size="small"
                    sx={{ textTransform: 'none', fontSize: '12px' }}
                    onClick={onClose}
                >
                    Forgot Password?
                </Button>
            </Box>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    mb: 2,
                    backgroundColor: '#333333',
                    '&:hover': { backgroundColor: '#555555' }
                }}
            >
                SIGN IN
            </Button>

            <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">OR</Typography>
            </Box>

            <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                sx={{
                    mb: 1,
                    color: '#1877f2',
                    borderColor: '#1877f2',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: 'rgba(24, 119, 242, 0.04)', borderColor: '#1877f2' }
                }}
            >
                Login with Facebook
            </Button>

            <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                sx={{
                    mb: 2,
                    color: '#db4437',
                    borderColor: '#db4437',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: 'rgba(219, 68, 55, 0.04)', borderColor: '#db4437' }
                }}
            >
                Login with Google +
            </Button>

            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                New Member?{' '}
                <Button
                    component={Link}
                    to="/registration"
                    size="small"
                    sx={{ textTransform: 'none', p: 0, minWidth: 'unset' }}
                    onClick={onClose}
                >
                    Register Now
                </Button>
            </Typography>
        </Box>
    </Box>
);

const DesktopHeader = ({
    // Auth data
    currentUser,
    
    // States
    // showLoginForm,
    searchValue,
    username,
    password,
    error,
    
    // Menu states
    isUserMenuOpen,
    isBrandsMenuOpen,
    userMenuAnchor,
    brandsMenuAnchor,
    
    // Data
    brands,
    navItems,
    
    // Handlers
    handleLogin,
    handleLogout,
    handleUserMenuToggle,
    handleBrandsMenuOpen,
    handleBrandsMenuClose,
    handleAccountClick,
    // handleCartClick,
    handleSearch,
    handleSearchChange,
    closeAllMenus,
    
    // Setters
    setUsername,
    setPassword,
}) => {
    const menuButtonSx = {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: '16px',
        padding: '8px',
        textTransform: 'uppercase',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
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
        }
    };

    const allBrandsButtonSx = {
        color: '#333333',
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '8px',
        textTransform: 'uppercase',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
        },        
    };

    return (
        <>
            {/* Desktop Top Bar */}
            <Box sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
                <Container maxWidth="xl">
                    <StyledToolbar>
                        {/* Logo */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                paddingRight: '70px',
                                paddingLeft: '70px',
                            }}
                        >
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                YOUR LOGO
                            </Link>
                        </Typography>

                        {/* Search Bar */}
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase 
                                placeholder="Search" 
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchValue}
                                onChange={(e) => handleSearchChange(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearch(e);
                                    }
                                }}  
                            />
                        </Search>

                        <Box sx={{ flexGrow: 1 }} />

                        {/* Desktop Menu Icons */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, paddingRight: '70px' }}>
                            {/* Cart Icon */}
                            <IconButton
                                component={Link}
                                to="/cart"
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'center',
                                    color: '#333333',
                                    padding: '8px',
                                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                                }}
                            >
                                <ShoppingCart />
                                <Typography variant="caption" sx={{ fontSize: '16px', fontWeight: 600 }}>
                                    Cart
                                </Typography>
                            </IconButton>

                            {/* Separator */}
                            <Box
                                component="span"
                                sx={{
                                    display: 'block',
                                    width: '1px',
                                    height: '24px',
                                    backgroundColor: '#333333',
                                    opacity: 0.8,
                                    mx: 0
                                }}
                            />

                            {/* User Icon with Dropdown */}
                            <Box>
                                <IconButton
                                    onClick={handleUserMenuToggle}
                                    sx={{
                                        display: 'flex',
                                        gap: 1,
                                        alignItems: 'center',
                                        color: '#333333',
                                        padding: '8px',
                                        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                                    }}
                                >
                                    <Person />
                                    <Typography variant="caption" sx={{ fontSize: '16px', fontWeight: 600 }}>
                                        {currentUser ? currentUser.fullName : 'User'}
                                    </Typography>
                                </IconButton>

                                <Popper
                                    open={isUserMenuOpen}
                                    anchorEl={userMenuAnchor}
                                    placement="bottom-end"
                                    transition
                                    sx={{ zIndex: 1300 }}
                                >
                                    {({ TransitionProps }) => (
                                        <Fade {...TransitionProps} timeout={500}>
                                            <Paper
                                                sx={{
                                                    mt: 1,
                                                    minWidth: 300,
                                                    maxWidth: 400,
                                                    boxShadow: 3,
                                                    border: '1px solid #e0e0e0'
                                                }}
                                            >
                                                <ClickAwayListener onClickAway={closeAllMenus}>
                                                    <Box>
                                                        {!currentUser ? (
                                                            <LoginForm
                                                                username={username}
                                                                setUsername={setUsername}
                                                                password={password}
                                                                setPassword={setPassword}
                                                                error={error}
                                                                handleLogin={handleLogin}
                                                                onClose={closeAllMenus}
                                                            />
                                                        ) : (
                                                            <MenuList>
                                                                <MenuItem onClick={handleAccountClick}>
                                                                    <AccountCircle sx={{ mr: 2 }} /> My Account
                                                                </MenuItem>
                                                                <MenuItem onClick={handleLogout}>
                                                                    <Logout sx={{ mr: 2 }} /> Log out
                                                                </MenuItem>
                                                            </MenuList>
                                                        )}
                                                    </Box>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Fade>
                                    )}
                                </Popper>
                            </Box>

                            {/* Separator */}
                            <Box
                                component="span"
                                sx={{
                                    display: 'block',
                                    width: '2px',
                                    height: '24px',
                                    backgroundColor: '#333333',
                                    opacity: 0.8,
                                    mx: 0
                                }}
                            />

                            {/* Language Icon */}
                            <IconButton
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    alignItems: 'center',
                                    color: '#333333',
                                    padding: '8px',
                                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' }
                                }}
                            >
                                <Language />
                                <Typography variant="caption" sx={{ fontSize: '16px', fontWeight: 600 }}>
                                    Lang
                                </Typography>
                            </IconButton>
                        </Box>
                    </StyledToolbar>
                </Container>
            </Box>

            {/* Desktop Navigation Bar */}
            <AppBar 
                position="static"
                sx={{
                    backgroundColor: 'white',
                    boxShadow: 'none',
                    borderBottom: '2px solid #D7D7D7',
                    paddingRight: '70px',
                    paddingLeft: '70px',
                }}
            >
                <Toolbar 
                    sx={{ 
                        justifyContent: 'space-between',
                        padding: 0,
                        minHeight: '40px !important'
                    }}
                >
                    {/* Main Menu */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {/* ALL BRANDS with dropdown */}
                        <Box>
                            <Button
                                onClick={handleBrandsMenuOpen}
                                endIcon={
                                    <ExpandMore 
                                        sx={{
                                            transition: 'transform 0.3s ease',
                                            transform: isBrandsMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                                        }}
                                    />
                                }
                                sx={allBrandsButtonSx}
                            >
                                ALL BRANDS
                            </Button>
                            <Menu
                                anchorEl={brandsMenuAnchor}
                                open={isBrandsMenuOpen}
                                onClose={handleBrandsMenuClose}
                                MenuListProps={{
                                    'aria-labelledby': 'brands-button',
                                }}
                                PaperProps={{
                                    sx: {
                                        mt: 1,
                                        width: 200,
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                                    }
                                }}
                            >
                                {brands.map((brand) => (
                                    <MenuItem 
                                        key={brand} 
                                        onClick={() => {
                                            console.log('Navigate to brand:', brand);
                                            handleBrandsMenuClose();
                                        }}
                                        sx={{
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                                transform: 'translateX(4px)',
                                            }
                                        }}
                                    >
                                        <Typography variant="body2">
                                            {brand}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        {/* Navigation Items */}
                        {navItems.map((item) => (
                            <Button
                                key={item.path}
                                component={Link}
                                to={item.path}
                                sx={menuButtonSx}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>

                    {/* Sell with us */}
                    <Box>
                        <Chip
                            label="SELL WITH US"
                            sx={{
                                backgroundColor: '#333333',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '12px',
                                '&:hover': {
                                    backgroundColor: '#555555'
                                }
                            }}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default DesktopHeader;