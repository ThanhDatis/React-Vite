import React, { useMemo, useCallback } from 'react';
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
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Collapse,
  useTheme,
  useMediaQuery,
  CircularProgress,

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
  ExpandLess,
} from '@mui/icons-material';
import { useHeader } from '../../../hooks/useHeader';
import { HEADER_DATA } from '../../../data/headerData';

// ==================== STYLED COMPONENTS ====================
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  backgroundColor: '#f5f5f5',
}));

// ==================== SHARED COMPONENTS ====================

// Logo Component - Used in both desktop and mobile
const LogoComponent = React.memo(() => (
  <Typography
    variant="h6"
    noWrap
    component="div"
    sx={{
      fontSize: { xs: '16px', md: '20px' },
      fontWeight: 'bold',
      paddingRight: { md: '70px' },
      paddingLeft: { md: '70px' },
      flexGrow: { xs: 1, md: 0 },
    }}
  >
    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      YOUR LOGO
    </Link>
  </Typography>
));
LogoComponent.displayName = 'LogoComponent';

// Search Component - Desktop only
const SearchComponent = React.memo(({ searchValue, onSearchChange, onSearch }) => (
  <Search>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder="Search"
      inputProps={{ 'aria-label': 'search' }}
      value={searchValue}
      onChange={(e) => onSearchChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSearch(e);
        }
      }}
    />
  </Search>
));
SearchComponent.displayName = 'SearchComponent';

// Cart Button - Desktop only
const CartButton = React.memo(() => (
  <IconButton
    component={Link}
    to="/cart"
    sx={{
      display: 'flex',
      gap: 1,
      alignItems: 'center',
      color: '#333333',
      padding: '8px',
      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
    }}
  >
    <ShoppingCart />
    <Typography variant="caption" sx={{ fontSize: '16px', fontWeight: 600 }}>
      Cart
    </Typography>
  </IconButton>
));
CartButton.displayName = 'CartButton';

// Language Button - Desktop only
const LanguageButton = React.memo(() => (
  <IconButton
    sx={{
      display: 'flex',
      gap: 1,
      alignItems: 'center',
      color: '#333333',
      padding: '8px',
      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
    }}
  >
    <Language />
    <Typography variant="caption" sx={{ fontSize: '16px', fontWeight: 600 }}>
      Lang
    </Typography>
  </IconButton>
));
LanguageButton.displayName = 'LanguageButton';

// Separator Component
const Separator = React.memo(({ width = '1px' }) => (
  <Box
    component="span"
    sx={{
      display: 'block',
      width: width,
      height: '24px',
      backgroundColor: '#333333',
      opacity: 0.8,
      mx: 0,
    }}
  />
));
Separator.displayName = 'Separator';

// Login Form Component - Shared between desktop and mobile
const LoginForm = React.memo(
  ({ username, setUsername, password, setPassword, error, handleLogin, onClose }) => (
    <Box sx={{ p: 3, width: '100%' }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}
      >
        SIGN IN
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
            '&:hover': { backgroundColor: '#555555' },
          }}
        >
          SIGN IN
        </Button>

        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            OR
          </Typography>
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
            '&:hover': {
              backgroundColor: 'rgba(24, 119, 242, 0.04)',
              borderColor: '#1877f2',
            },
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
            '&:hover': {
              backgroundColor: 'rgba(219, 68, 55, 0.04)',
              borderColor: '#db4437',
            },
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
  )
);
LoginForm.displayName = 'LoginForm';

// User Menu Content - Desktop
const UserMenuContent = React.memo(
  ({
    currentUser,
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleLogin,
    handleAccountClick,
    handleLogout,
    onClose,
  }) => (
    <>
      {!currentUser ? (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          error={error}
          handleLogin={handleLogin}
          onClose={onClose}
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
    </>
  )
);
UserMenuContent.displayName = 'UserMenuContent';

// Brand Menu Item
const BrandMenuItem = React.memo(({ brand, onBrandClick }) => {
  const handleClick = useCallback(() => {
    onBrandClick(brand);
  }, [brand, onBrandClick]);

  return (
    <MenuItem
      onClick={handleClick}
      sx={{
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          transform: 'translateX(4px)',
        },
      }}
    >
      <Typography variant="body2">{brand}</Typography>
    </MenuItem>
  );
});
BrandMenuItem.displayName = 'BrandMenuItem';

// Navigation Item
const NavigationItem = React.memo(({ item, sx }) => (
  <Button component={Link} to={item.path} sx={sx}>
    {item.label}
  </Button>
));
NavigationItem.displayName = 'NavigationItem';

// ==================== MAIN HEADER COMPONENT ====================
const HeaderContent = () => {
  // Theme and responsive
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const {
    states,
    computed,
    handles,
    utils,
    setters,
  } = useHeader();

  const { brands, navItems, Colors } = HEADER_DATA;
  // State management
  // const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  // const [showLoginForm, setShowLoginForm] = useState(false);
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  // const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  // const [brandsMenuAnchor, setBrandsMenuAnchor] = useState(null);
  // const [brandMenuOpen, setBrandMenuOpen] = useState(false);
  // const [searchValue, setSearchValue] = useState('');

  // Data
  // const brands = ['Adidas', 'Apple', 'Bose', 'Canon', 'Dell', 'Dyson'];
  // const navItems = [
  //   { label: 'SKINCARE', path: '/skincare' },
  //   { label: 'MAKE UP', path: '/makeup' },
  //   { label: 'HAIRCARE', path: '/haircare' },
  //   { label: 'BATH & BODY', path: '/bath-body' },
  //   { label: 'BEAUTY SUPPLEMENTS', path: '/fragrance' },
  //   { label: 'PROMOS', path: '/promos' },
  // ];

  // Computed values
  // const isUserMenuOpen = Boolean(userMenuAnchor);
  // const isBrandsMenuOpen = Boolean(brandsMenuAnchor);
  // const userDisplayName = useMemo(() => {
  //   return currentUser ? currentUser.fullName : 'User';
  // }, [currentUser]);

  // Handlers
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   const success = await login(username, password);
  //   if (success) {
  //     resetLoginForm();
  //     closeAllMenus();
  //   } else {
  //     setError('Invalid username or password');
  //   }
  // };

  // const handleLogout = () => {
  //   logout();
  //   closeAllMenus();
  // };

  // const handleUserMenuToggle = (event) => {
  //   if (isMobile) {
  //     setShowLoginForm(!showLoginForm);
  //   } else {
  //     setUserMenuAnchor(userMenuAnchor ? null : event.currentTarget);
  //     setShowLoginForm(!showLoginForm);
  //   }
  // };

  // const handleBrandsMenuOpen = (event) => {
  //   setBrandsMenuAnchor(event.currentTarget);
  // };

  // const handleBrandsMenuClose = () => {
  //   setBrandsMenuAnchor(null);
  // };

  // const handleBrandMenuToggle = () => {
  //   setBrandMenuOpen(!brandMenuOpen);
  // };

  // const handleMobileDrawerToggle = () => {
  //   setMobileDrawerOpen(!mobileDrawerOpen);
  //   if (isMobile) {
  //     setShowLoginForm(false);
  //     setError('');
  //   }
  // };

  // const handleAccountClick = () => {
  //   navigate('/user-account');
  //   closeAllMenus();
  // };

  // const handleCartClick = () => {
  //   navigate('/cart');
  //   closeAllMenus();
  // };

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   if (searchValue.trim()) {
  //     console.log('Searching for:', searchValue);
  //     closeAllMenus();
  //   }
  // };

  // const handleSearchChange = (value) => {
  //   setSearchValue(value);
  // };

  // const handleBrandClick = useCallback(
  //   (brand) => {
  //     console.log('Navigate to brand:', brand);
  //     handleBrandsMenuClose();
  //   },
  //   [handleBrandsMenuClose]
  // );

  // const resetLoginForm = () => {
  //   setShowLoginForm(false);
  //   setUsername('');
  //   setPassword('');
  //   setError('');
  // };

  // const closeAllMenus = () => {
  //   setShowLoginForm(false);
  //   setUserMenuAnchor(null);
  //   setBrandsMenuAnchor(null);
  //   setMobileDrawerOpen(false);
  //   setError('');
  // };

  // Memoized styles
  const menuButtonSx = useMemo(
    () => ({
      color: '#333333',
      fontWeight: 'bold',
      fontSize: '16px',
      padding: '8px',
      textTransform: 'uppercase',
      position: 'relative',
      overflow: 'hidden',
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
    }),
    []
  );

  const expandIconTransform = useMemo(
    () => ({
      transition: 'transform 0.3s ease',
      transform: computed.isBrandsMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    }),
    [computed.isBrandsMenuOpen]
  );

  // ==================== DESKTOP HEADER ====================
  const renderDesktopHeader = () => (
    <>
      {/* Desktop Top Bar */}
      <Box sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
        <Container maxWidth="xl">
          <StyledToolbar>
            <LogoComponent />
            <SearchComponent
              searchValue={states.searchValue}
              onSearchChange={handles.handleSearchChange}
              onSearch={handles.handleSearch}
            />
            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Menu Icons */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                paddingRight: '70px',
              }}
            >
              <CartButton />
              <Separator />

              {/* User Icon with Dropdown */}
              <Box>
                <IconButton
                  onClick={handles.handleUserMenuToggle}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    color: '#333333',
                    padding: '8px',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  }}
                >
                  <Person />
                  <Typography
                    variant="caption"
                    sx={{ fontSize: '16px', fontWeight: 600 }}
                  >
                    {utils.userDisplayName}
                  </Typography>
                </IconButton>

                <Popper
                  open={computed.isUserMenuOpen}
                  anchorEl={states.userMenuAnchor}
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
                          border: '1px solid #e0e0e0',
                        }}
                      >
                        <ClickAwayListener onClickAway={utils.closeAllMenus}>
                          <Box>
                            <UserMenuContent
                              currentUser={states.currentUser}
                              username={states.username}
                              setUsername={setters.setUsername}
                              password={states.password}
                              setPassword={setters.setPassword}
                              error={states.error}
                              handleLogin={handles.handleLogin}
                              handleAccountClick={handles.handleAccountClick}
                              handleLogout={handles.handleLogout}
                              onClose={utils.closeAllMenus}
                            />
                          </Box>
                        </ClickAwayListener>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </Box>

              <Separator width="2px" />
              <LanguageButton />
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
            minHeight: '40px !important',
          }}
        >
          {/* Main Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* ALL BRANDS with dropdown */}
            <Box>
              <Button
                onClick={handles.handleBrandsMenuOpen}
                endIcon={<ExpandMore sx={expandIconTransform} />}
                sx={{
                  color: '#333333',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  padding: '8px',
                  textTransform: 'uppercase',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                ALL BRANDS
              </Button>
              <Menu
                anchorEl={states.brandsMenuAnchor}
                open={computed.isBrandsMenuOpen}
                onClose={handles.handleBrandsMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'brands-button',
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    width: 200,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                {brands.map((brand) => (
                  <BrandMenuItem
                    key={brand}
                    brand={brand}
                    onBrandClick={handles.handleBrandClick}
                  />
                ))}
              </Menu>
            </Box>

            {/* Navigation Items */}
            {navItems.map((item) => (
              <NavigationItem key={item.path} item={item} sx={menuButtonSx} />
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
                  backgroundColor: '#555555',
                },
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );

  // ==================== MOBILE HEADER ====================
  const renderMobileHeader = () => {
    // Mobile Drawer Content
    const drawerContent = (
      <Box sx={{ width: 280 }} role="presentation">
        <DrawerHeader>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Menu
          </Typography>
          <IconButton onClick={handles.handleMobileDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>

        <Divider />

        {/* Search Section */}
        <Box sx={{ p: 2 }}>
          <Box
            component="form"
            onSubmit={handles.handleSearch}
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
              value={states.searchValue}
              onChange={(e) => handles.handleSearchChange(e.target.value)}
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
          <ListItemButton onClick={handles.handleCartClick}>
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="Cart" />
          </ListItemButton>

          <Divider />

          {/* Brands Section */}
          <ListItemButton onClick={handles.handleBrandMenuToggle}>
            <ListItemText primary="ALL BRANDS" />
            {states.brandMenuOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={states.brandMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {brands.map((brand) => (
                <ListItemButton
                  key={brand}
                  sx={{ pl: 4 }}
                  onClick={() => {
                    console.log('Navigate to brand:', brand);
                    handles.handleMobileDrawerToggle();
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
              onClick={handles.handleMobileDrawerToggle}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}

          <Divider />

          {/* Sell with us */}
          <ListItemButton onClick={handles.handleMobileDrawerToggle}>
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
          {!states.currentUser ? (
            <ListItemButton onClick={handles.handleUserMenuToggle}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItemButton>
          ) : (
            <>
              <ListItemButton onClick={handles.handleAccountClick}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="My Account" />
              </ListItemButton>
              <ListItemButton onClick={handles.handleLogout}>
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
        {states.showLoginForm && !states.currentUser && (
          <>
            <Divider />
            <LoginForm
              username={states.username}
              setUsername={setters.setUsername}
              password={states.password}
              setPassword={setters.setPassword}
              error={states.error}
              handleLogin={handles.handleLogin}
              onClose={utils.closeAllMenus}
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
                onClick={handles.handleMobileDrawerToggle}
                sx={{ mr: 2, color: '#333333' }}
              >
                <MenuIcon />
              </IconButton>

              {/* Logo */}
              <LogoComponent />
            </StyledToolbar>
          </Container>
        </Box>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={states.mobileDrawerOpen}
          onClose={handles.handleMobileDrawerToggle}
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

  // ==================== RENDER ====================
  return (
    <header className="header">
      {isMobile ? renderMobileHeader() : renderDesktopHeader()}
    </header>
  );
};

export default HeaderContent;