// src/components/layouts/Header/HeaderContent.jsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Collapse,
  InputBase,
  useTheme,
  useMediaQuery,
  styled,
} from '@mui/material';

import {
  AccountCircle,
  Logout,
  Search as SearchIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandMore,
  ExpandLess,
  Person,
  Language,
  ShoppingCart,
} from '@mui/icons-material';

import { 
  CartIcon,
  UserIcon,
  LanguageIcon,
  Separator, 
  HeaderIconGroup,
} from '../../common/Icons';

import { LoginForm } from '../../common/Form';
import { useHeader } from '../../../hooks/useHeader';
import { HEADER_DATA } from '../../../data/headerData';

// Import shared components
import { 
  SearchBar,
  CompleteNavigation,
  SellWithUs,
  Logo
} from '../../../shared';

// ==================== STYLED COMPONENTS ====================
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

// ==================== USER MENU COMPONENT ====================
const UserMenu = React.memo(({ 
  currentUser,
  onAccountClick,
  onLogout,
  onLogin,
  error,
  isLoading,
  onClose
}) => (
  <Box
    sx={{
      position: 'fixed',
      top: 64,
      right: 70,
      zIndex: (theme) => theme.zIndex.modal,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      display: { xs: 'none', md: 'block' }
    }}
  >
    {!currentUser ? (
      <LoginForm 
        onSubmit={onLogin}
        error={error}
        onClose={onClose}
        isLoading={isLoading}
      />
    ) : (
      <Box sx={{ 
        backgroundColor: 'white', 
        borderRadius: 1,
        minWidth: 200,
        py: 1
      }}>
        <List dense>
          <ListItemButton onClick={onAccountClick}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="My Account" />
          </ListItemButton>
          <ListItemButton onClick={onLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </List>
      </Box>
    )}
  </Box>
));
UserMenu.displayName = 'UserMenu';

// ==================== MOBILE DRAWER CONTENT ====================
const MobileDrawerContent = React.memo(({ 
  brands,
  navItems,
  states,
  handles,
  onClose
}) => (
  <Box sx={{ width: 280 }} role="presentation">
    {/* Drawer Header */}
    <DrawerHeader>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Menu
      </Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </DrawerHeader>

    <Divider />

    {/* Mobile Search */}
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
        <IconButton
          type="submit"
          size="small"
          sx={{ minWidth: 'auto', p: 0.5, color: '#333333' }}
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>

    <Divider />

    {/* Navigation Menu */}
    <List>
      {/* Cart */}
      <ListItemButton onClick={handles.handleCartClick}>
        <ListItemIcon>
          <Box sx={{ position: 'relative' }}>
            <ShoppingCart />
            {states.cartCount > 0 && (
              <Box sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                backgroundColor: 'error.main',
                color: 'white',
                borderRadius: '50%',
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 'bold'
              }}>
                {states.cartCount}
              </Box>
            )}
          </Box>
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
                handles.handleBrandClick(brand);
                onClose();
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
          onClick={onClose}
        >
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}

      <Divider />

      {/* Sell with us */}
      <ListItemButton onClick={onClose}>
        <ListItemText
          primary={
            <SellWithUs 
              sx={{
                fontSize: '12px',
                height: 'auto',
                padding: '4px 8px'
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
        <Box sx={{ p: 2 }}>
          <LoginForm
            onSubmit={handles.handleLogin}
            error={states.error}
            onClose={onClose}
            isLoading={states.isLoading}
          />
        </Box>
      </>
    )}
  </Box>
));
MobileDrawerContent.displayName = 'MobileDrawerContent';

// ==================== MAIN HEADER COMPONENT ====================
const HeaderContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const {
    states,
    computed,
    handles,
    utils,
  } = useHeader();

  const { brands, navItems } = HEADER_DATA;

  // ==================== MEMOIZED HANDLERS ====================
  const navigationHandlers = useMemo(() => ({
    handleBrandClick: handles.handleBrandClick,
    handleNavClick: (item) => {
      console.log('Navigation clicked:', item);
    },
    handleSellWithUs: () => {
      console.log('Sell with us clicked');
    }
  }), [handles.handleBrandClick]);

  return (
    <header className="header">
      {/* ==================== TOP BAR ==================== */}
      <Box sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
        <Container maxWidth="xl">
          <StyledToolbar>
            {/* Mobile Menu Button */}
            <IconButton
              edge="start"
              onClick={handles.handleMobileDrawerToggle}
              sx={{ 
                mr: 2, 
                color: '#333333',
                display: { xs: 'block', md: 'none' }
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Logo />

            {/* Desktop Search */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <SearchBar
                onSearch={handles.handleSearch}
                recentSearches={states.recentSearches || []}
                showSuggestions
              />
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Icons */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <HeaderIconGroup sx={{ paddingRight: '70px' }}>
                <CartIcon 
                  cartCount={states.cartCount || 0}
                  onClick={handles.handleCartClick}
                />
                <Separator width='2px' />              
                <UserIcon
                  username={computed.userDisplayName || 'User'}
                  isLoggedIn={!!states.currentUser}
                  onClick={handles.handleUserMenuToggle}
                />
                <Separator width="2px" />
                <LanguageIcon 
                  currentLang='EN'
                  onClick={handles.handleLanguageClick}
                />
              </HeaderIconGroup>
            </Box>

            {/* Mobile Cart Icon */}
            <IconButton
              onClick={handles.handleCartClick}
              sx={{ 
                display: { xs: 'block', md: 'none' },
                position: 'relative',
                mr: 1
              }}
            >
              <ShoppingCart />
              {states.cartCount > 0 && (
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: 'error.main',
                  color: 'white',
                  borderRadius: '50%',
                  width: 20,
                  height: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 'bold'
                }}>
                  {states.cartCount}
                </Box>
              )}
            </IconButton>
          </StyledToolbar>
        </Container>
      </Box>

      {/* ==================== DESKTOP NAVIGATION BAR ==================== */}
      <AppBar 
        position="static"
        sx={{
          backgroundColor: 'white',
          boxShadow: 'none',
          borderBottom: '2px solid #D7D7D7',
          paddingRight: { md: '70px' },
          paddingLeft: { md: '70px' },
          display: { xs: 'none', md: 'block' }
        }}
      >
        <Toolbar sx={{
          justifyContent: 'space-between',
          padding: 0,
          minHeight: '40px !important',
        }}>
          {/* Complete Navigation - use shared component */}
          <CompleteNavigation
            brands={brands}
            navItems={navItems}
            handlers={navigationHandlers}
            showSellWithUs={true}
            sx={{ width: '100%' }}
          />
        </Toolbar>
      </AppBar>

      {/* ==================== MOBILE DRAWER ==================== */}
      <Drawer
        anchor="right"
        open={states.mobileDrawerOpen}
        onClose={handles.handleMobileDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            boxSizing: 'border-box',
          },
        }}
      >
        <MobileDrawerContent
          brands={brands}
          navItems={navItems}
          states={states}
          handles={handles}
          onClose={handles.handleMobileDrawerToggle}
        />
      </Drawer>

      {/* ==================== DESKTOP USER MENU ==================== */}
      {computed.isUserMenuOpen && !isMobile && (
        <UserMenu
          currentUser={states.currentUser}
          onAccountClick={handles.handleAccountClick}
          onLogout={handles.handleLogout}
          onLogin={handles.handleLogin}
          error={states.error}
          isLoading={states.isLoading}
          onClose={utils.closeAllMenus}
        />
      )}
    </header>
  );
};

export default HeaderContent;