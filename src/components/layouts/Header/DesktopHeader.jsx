import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";
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
} from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledToolbar = styled(Box)(() => ({
  padding: "0 !important",
  minHeight: "64px",
  width: "100%",
  display: "flex",
  alignItems: "center",
}));

//memoized child component
//Memoized logo component
const LogoComponent = React.memo(() => (
  <Typography
    variant="h6"
    noWrap
    component="div"
    sx={{
      fontSize: "20px",
      fontWeight: "bold",
      paddingRight: "70px",
      paddingLeft: "70px",
    }}
  >
    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
      YOUR LOGO
    </Link>
  </Typography>
));

LogoComponent.displayName = "LogoComponent";

//memoized search component
const SearchComponent = React.memo(
  ({ searchValue, onSearchChange, onSearch }) => (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(e);
          }
        }}
      />
    </Search>
  )
);

SearchComponent.displayName = "SearchComponent";

//memoized Cart button component
const CartButton = React.memo(() => (
  <IconButton
    component={Link}
    to="/cart"
    sx={{
      display: "flex",
      gap: 1,
      alignItems: "center",
      color: "#333333",
      padding: "8px",
      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
    }}
  >
    <ShoppingCart />
    <Typography variant="caption" sx={{ fontSize: "16px", fontWeight: 600 }}>
      Cart
    </Typography>
  </IconButton>
));

CartButton.displayName = "CartButton";

//memoized Language component
const LanguageButton = React.memo(() => (
  <IconButton
    sx={{
      display: "flex",
      gap: 1,
      alignItems: "center",
      color: "#333333",
      padding: "8px",
      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
    }}
  >
    <Language />
    <Typography variant="caption" sx={{ fontSize: "16px", fontWeight: 600 }}>
      Lang
    </Typography>
  </IconButton>
));

LanguageButton.displayName = "LanguageButton";

//memoized Separator component
const Separator = React.memo(({ width = "1px"}) => (
  <Box
    component="span"
    sx={{
      display: "block",
      width: width,
      height: "24px",
      backgroundColor: "#333333",
      opacity: 0.8,
      mx: 0,
    }}
  />
));

Separator.displayName = "Separator";

//memoized LoginForm component
const LoginForm = React.memo(
  ({
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleLogin,
    onClose,
  }) => (
    <Box sx={{ p: 3, width: "100%" }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}
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

        <Box sx={{ textAlign: "right", mb: 2 }}>
          <Button
            component={Link}
            to="/forgot-password"
            size="small"
            sx={{ textTransform: "none", fontSize: "12px" }}
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
            backgroundColor: "#333333",
            "&:hover": { backgroundColor: "#555555" },
          }}
        >
          SIGN IN
        </Button>

        <Box sx={{ textAlign: "center", mb: 2 }}>
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
            color: "#1877f2",
            borderColor: "#1877f2",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(24, 119, 242, 0.04)",
              borderColor: "#1877f2",
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
            color: "#db4437",
            borderColor: "#db4437",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(219, 68, 55, 0.04)",
              borderColor: "#db4437",
            },
          }}
        >
          Login with Google +
        </Button>

        <Typography variant="body2" sx={{ textAlign: "center" }}>
          New Member?{" "}
          <Button
            component={Link}
            to="/registration"
            size="small"
            sx={{ textTransform: "none", p: 0, minWidth: "unset" }}
            onClick={onClose}
          >
            Register Now
          </Button>
        </Typography>
      </Box>
    </Box>
  )
);

LoginForm.displayName = "LoginForm";

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

UserMenuContent.displayName = "UserMenuContent";

//memoized brands menu component
const BrandMenuItem = React.memo(({ brand, onBrandClick }) => {
  const handleClick = useCallback(() => {
    onBrandClick(brand);
  }, [brand, onBrandClick]);

  return (
    <MenuItem
      onClick={handleClick}
      sx={{
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
          transform: "translateX(4px)",
        },
      }}
    >
      <Typography variant="body2">{brand}</Typography>
    </MenuItem>
  );
});

BrandMenuItem.displayName = "BrandMenuItem";

//memoized navigation component
const NavigationItem = React.memo(({ item, sx }) => (
  <Button component={Link} to={item.path} sx={sx}>
    {item.label}
  </Button>
));

NavigationItem.displayName = "NavigationItem";

//memoized main component
const DesktopHeader = ({
  currentUser,
  // showLoginForm,
  searchValue,
  username,
  password,
  error,

  isUserMenuOpen,
  isBrandsMenuOpen,
  userMenuAnchor,
  brandsMenuAnchor,

  brands,
  navItems,

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

  setUsername,
  setPassword,
}) => {
  //memoized Styles
  const menuButtonSx = useMemo(
    () => ({
      color: "#333333",
      fontWeight: "bold",
      fontSize: "16px",
      padding: "8px",
      textTransform: "uppercase",
      position: "relative",
      overflow: "hidden",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
      },
      "&::after": {
        content: '""',
        position: "absolute",
        bottom: 0,
        left: "50%",
        width: 0,
        height: "2px",
        backgroundColor: "#333333",
        transform: "translateX(-50%)",
        transformOrigin: "center",
        transition: "width 0.3s ease-in-out",
      },
      "&:hover::after": {
        width: "80%",
      },
    }),
    []
  );

  const allBrandsButtonSx = useMemo(
    () => ({
      color: "#333333",
      fontSize: "16px",
      fontWeight: "bold",
      padding: "8px",
      textTransform: "uppercase",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
      },
    }),
    []
  );

  const topBarSx = useMemo(
    () => ({
      bgcolor: "background.paper",
      boxShadow: 1,
    }),
    []
  );

  const userButtonSx = useMemo(
    () => ({
      display: "flex",
      gap: 1,
      alignItems: "center",
      color: "#333333",
      padding: "8px",
      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
    }),
    []
  );

  const popperSx = useMemo(
    () => ({
      mt: 1,
      minWidth: 300,
      maxWidth: 400,
      boxShadow: 3,
      border: "1px solid #e0e0e0",
    }),
    []
  );

  const navigationBarSx = useMemo(
    () => ({
      backgroundColor: "white",
      boxShadow: "none",
      borderBottom: "2px solid #D7D7D7",
      paddingRight: "70px",
      paddingLeft: "70px",
    }),
    []
  );

  const sellChipsx = useMemo(
    () => ({
      backgroundColor: "#333333",
      color: "white",
      fontWeight: "bold",
      fontSize: "12px",
      "&:hover": {
        backgroundColor: "#555555",
      },
    }),
    []
  );

  const menuPaperProps = useMemo(() => {
    return {
      sx: {
        mt: 1,
        width: 200,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      },
    };
  }, []);

  //memoized callbacks
  const handleBrandClick = useCallback(
    (brand) => {
      console.log("Navigate to brand:", brand);
      handleBrandsMenuClose();
    },
    [handleBrandsMenuClose]
  );

  const userDisplayName = useMemo(() => {
    return currentUser ? currentUser.fullName : "User";
  }, [currentUser]);

  const expandIconTransform = useMemo(
    () => ({
      transition: "transform 0.3s ease",
      transform: isBrandsMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
    }),
    [isBrandsMenuOpen]
  );

  //memoized lists
  const renderedBrands = useMemo(
    () =>
      brands.map((brand) => (
        <BrandMenuItem
          key={brand}
          brand={brand}
          onBrandClick={handleBrandClick}
        />
      )),
    [brands, handleBrandClick]
  );

  const renderednavItems = useMemo(
    () =>
      navItems.map((item) => (
        <NavigationItem key={item.path} item={item} sx={menuButtonSx} />
      )),
    [navItems, menuButtonSx]
  );

  return (
    <>
      {/* Desktop Top Bar */}
      <Box sx={topBarSx}>
        <Container maxWidth="xl">
          <StyledToolbar>
            {/* Logo */}
            <LogoComponent />

            {/* Search Bar */}
            <SearchComponent
              searchValue={searchValue}
              onSearchChange={handleSearchChange}
              onSearch={handleSearch}
            />

            <Box sx={{ flexGrow: 1 }} />

            {/* Desktop Menu Icons */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                paddingRight: "70px",
              }}
            >
              {/* Cart Icon */}
              <CartButton />

              {/* Separator */}
              <Separator />

              {/* User Icon with Dropdown */}
              <Box>
                <IconButton onClick={handleUserMenuToggle} sx={userButtonSx}>
                  <Person />
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "16px", fontWeight: 600 }}
                  >
                    {userDisplayName}
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
                      <Paper sx={popperSx}>
                        <ClickAwayListener onClickAway={closeAllMenus}>
                          <Box>
                            <UserMenuContent
                              currentUser={currentUser}
                              username={username}
                              setUsername={setUsername}
                              password={password}
                              setPassword={setPassword}
                              error={error}
                              handleLogin={handleLogin}
                              handleAccountClick={handleAccountClick}
                              handleLogout={handleLogout}
                              onClose={closeAllMenus}
                            />
                          </Box>
                        </ClickAwayListener>
                      </Paper>
                    </Fade>
                  )}
                </Popper>
              </Box>

              {/* Separator */}
              <Separator width="2px" />

              {/* Language Icon */}
              <LanguageButton />
            </Box>
          </StyledToolbar>
        </Container>
      </Box>

      {/* Desktop Navigation Bar */}
      <AppBar position="static" sx={navigationBarSx}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            padding: 0,
            minHeight: "40px !important",
          }}
        >
          {/* Main Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* ALL BRANDS with dropdown */}
            <Box>
              <Button
                onClick={handleBrandsMenuOpen}
                endIcon={<ExpandMore sx={expandIconTransform} />}
                sx={allBrandsButtonSx}
              >
                ALL BRANDS
              </Button>
              <Menu
                anchorEl={brandsMenuAnchor}
                open={isBrandsMenuOpen}
                onClose={handleBrandsMenuClose}
                MenuListProps={{
                  "aria-labelledby": "brands-button",
                }}
                PaperProps={menuPaperProps}
              >
                {renderedBrands}
              </Menu>
            </Box>

            {/* Navigation Items */}
            {renderednavItems}
          </Box>

          {/* Sell with us */}
          <Box>
            <Chip label="SELL WITH US" sx={sellChipsx} />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default DesktopHeader;
