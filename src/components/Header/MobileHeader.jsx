import React from 'react';
import { Link } from 'react-router-dom';
import {
    Box,
    Container,
    IconButton,
    Button,
    Typography,
    TextField,
    Alert,
    InputBase,
    Drawer,
    List,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Divider,
    styled,
    Collapse,
    Chip
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
    Menu as MenuIcon,
    Close as CloseIcon,
    ExpandMore,
    ExpandLess
} from '@mui/icons-material';

const StyledToolbar = styled(Box)(() => ({
    padding: '0 !important',
    minHeight: '64px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
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

const MobileHeader = ({
    // Auth data
    currentUser,
    
    // States
    showLoginForm,
    mobileDrawerOpen,
    searchValue,
    username,
    password,
    error,
    
    // Data
    brands,
    navItems,
    
    // Handlers
    handleLogin,
    handleLogout,
    handleUserMenuToggle,
    handleMobileDrawerToggle,
    handleAccountClick,
    handleCartClick,
    handleSearch,
    handleSearchChange,
    closeAllMenus,
    
    // Setters
    setUsername,
    setPassword,
}) => {
    const [brandMenuOpen, setBrandMenuOpen] = React.useState(false);

    const handleBrandMenuToggle = () => {
        setBrandMenuOpen(!brandMenuOpen);
    };

    // Mobile Drawer Content
    const drawerContent = (
        <Box sx={{ width: 300 }} role="presentation">
            <DrawerHeader>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Menu
                </Typography>
                <IconButton onClick={handleMobileDrawerToggle}>
                    <CloseIcon />
                </IconButton>
            </DrawerHeader>
            
            <Divider />

            {/* Search Section */}
            <Box sx={{ p: 2 }}>
                <Box
                    component="form"
                    onSubmit={handleSearch}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        padding: '4px 12px',
                        backgroundColor: 'white',
                    }}
                >
                    <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                    <InputBase
                        placeholder="Search..."
                        value={searchValue}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        sx={{ flex: 1 }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <Button
                        type="submit"
                        size="small"
                        sx={{ minWidth: 'auto', p: 0.5, color: '#333333' }}
                    >
                        Search
                    </Button>
                </Box>
            </Box>

            <Divider />

            {/* Navigation Menu */}
            <List>
                {/* Cart */}
                <ListItemButton onClick={handleCartClick}>
                    <ListItemIcon>
                        <ShoppingCart />
                    </ListItemIcon>
                    <ListItemText primary="Cart" />
                </ListItemButton>

                <Divider />

                {/* Brands Section */}
                <ListItemButton onClick={handleBrandMenuToggle}>
                    <ListItemText primary="ALL BRANDS" />
                    {brandMenuOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={brandMenuOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {brands.map((brand) => (
                            <ListItemButton
                                key={brand}
                                sx={{ pl: 4 }}
                                onClick={() => {
                                    console.log('Navigate to brand:', brand);
                                    handleMobileDrawerToggle();
                                }}
                            >
                                <ListItemText primary={brand} />
                            </ListItemButton>
                        ))}
                    </List>
                </Collapse>

                <Divider />

                {/* Navigation Items */}
                {navItems.map((item) => (
                    <ListItemButton
                        key={item.path}
                        component={Link}
                        to={item.path}
                        onClick={handleMobileDrawerToggle}
                    >
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}

                <Divider />

                {/* Sell with us */}
                <ListItemButton onClick={handleMobileDrawerToggle}>
                    <ListItemText 
                        primary={
                            <Chip
                                label="SELL WITH US"
                                size="small"
                                sx={{
                                    backgroundColor: '#333333',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '12px',
                                }}
                            />
                        }
                    />
                </ListItemButton>

                <Divider />

                {/* User Section */}
                {!currentUser ? (
                    <ListItemButton onClick={handleUserMenuToggle}>
                        <ListItemIcon>
                            <Person />
                        </ListItemIcon>
                        <ListItemText primary="Sign In" />
                    </ListItemButton>
                ) : (
                    <>
                        <ListItemButton onClick={handleAccountClick}>
                            <ListItemIcon>
                                <AccountCircle />
                            </ListItemIcon>
                            <ListItemText primary="My Account" />
                        </ListItemButton>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary="Log out" />
                        </ListItemButton>
                    </>
                )}

                {/* Language */}
                <ListItemButton>
                    <ListItemIcon>
                        <Language />
                    </ListItemIcon>
                    <ListItemText primary="Language" />
                </ListItemButton>
            </List>

            {/* Login Form for Mobile */}
            {showLoginForm && !currentUser && (
                <>
                    <Divider />
                    <LoginForm 
                        username={username}
                        setUsername={setUsername}
                        password={password}
                        setPassword={setPassword}
                        error={error}
                        handleLogin={handleLogin}
                        onClose={closeAllMenus}
                    />
                </>
            )}
        </Box>
    );

    return (
        <>
            {/* Mobile Top Bar */}
            <Box sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
                <Container maxWidth="xl">
                    <StyledToolbar>
                        {/* Mobile Menu Button */}
                        <IconButton
                            edge="start"
                            onClick={handleMobileDrawerToggle}
                            sx={{ mr: 2, color: '#333333' }}
                        >
                            <MenuIcon />
                        </IconButton>

                        {/* Logo */}
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                flexGrow: 1
                            }}
                        >
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                YOUR LOGO
                            </Link>
                        </Typography>
                    </StyledToolbar>
                </Container>
            </Box>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileDrawerOpen}
                onClose={handleMobileDrawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 300,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
};

export default MobileHeader;