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
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Collapse,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import {  
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

import { 
  CartIcon,
  UserIcon,
  LanguageIcon,
  Separator, 
  HeaderIconGroup,
} from '../../common/Icons';

import { SearchBar } from '../../../shared';
import { LoginForm } from '../../common/Form';
import { useHeader } from '../../../hooks/useHeader';
import { HEADER_DATA } from '../../../data/headerData';

// ==================== STYLED COMPONENTS ====================
// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   width: '100%',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

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
// const SearchComponent = React.memo(({ searchValue, onSearchChange, onSearch }) => (
//   <Search>
//     <SearchIconWrapper>
//       <SearchIcon />
//     </SearchIconWrapper>
//     <StyledInputBase
//       placeholder="Search"
//       inputProps={{ 'aria-label': 'search' }}
//       value={searchValue}
//       onChange={(e) => onSearchChange(e.target.value)}
//       onKeyDown={(e) => {
//         if (e.key === 'Enter') {
//           onSearch(e);
//         }
//       }}
//     />
//   </Search>
// ));
// SearchComponent.displayName = 'SearchComponent';

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
            <SearchBar
              onSearch={handles.handleSearch}
              recentSearches={states.recentSearches}
              showSuggestions
            />
            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Menu Icons */}
            <HeaderIconGroup sx={{ paddingRight: '70px', }}>
              <CartIcon 
                cartCount={states.cartCount}
                onClick={handles.handleCartClick}
              />
              <Separator width='2px' />              
              <UserIcon
                username={computed.userDisplayName}
                isLoggedIn={!!states.currentUser}
                onClick={handles.handleUserMenuToggle}
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                  color: '#333333',
                  padding: '8px',
                  '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                }}
              />
              <Separator width="2px" />
              <LanguageIcon 
                currentLang='EN'
                onClick={handles.handleLanguageClick}
              />
            </HeaderIconGroup>
          </StyledToolbar>
        </Container>
      </Box>

      {/* Desktop Navigation Bar */}
      <AppBar position="static"
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
const renderUserMenu = () => (
    <Popper 
    open={computed.isUserMenuOpen} 
    anchorEl={states.userMenuAnchor}
    placement="bottom-start"
    >
      {!states.currentUser ? (
        <LoginForm 
          onSubmit={async (values) => {
            const success = await handles.handleLogin(values);
            if (success) {
              setters.setError('Invalid credentials');
            }
          }}
          error={states.error}
          onClose={utils.closeAllMenus}
          isLoading={states.isLoading}
          onSocialLogin={handles.handleSocialLogin}
        />
        ) : (
          <UserMenu />
      )}
      </Popper>
  );
  return (
    <header className="header">
      {isMobile ? renderMobileHeader() : renderDesktopHeader()}
      {renderUserMenu()}
    </header>
  );
};

export default HeaderContent;