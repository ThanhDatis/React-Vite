import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    Box,
    Container,
    IconButton,
    Button,
    Popper,
    Paper,
    ClickAwayListener,
    Typography,
    TextField,
    MenuItem,
    MenuList,
    Alert,
    Fade,
    InputBase,
    styled,
    alpha
} from '@mui/material';
import {
    ShoppingCart,
    Person,
    Language,
    Facebook,
    Google,
    AccountCircle,
    Logout,
    Search as SearchIcon
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

const StyledToolbar = styled(Box)(({ theme }) => ({
    padding: '0 !important',
    minHeight: '64px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
}));

export default function HeaderTopBar() {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const { currentUser, login, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        const success = await login(username, password);
        if (success) {
            setShowLoginForm(false);
            setUsername('');
            setPassword('');
        } else {
            setError('Invalid username or password');
        }
    };

    const handleLogout = () => {
        logout();
        setShowLoginForm(false);
        setAnchorEl(null);
    };

    const toggleLoginForm = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setShowLoginForm(!showLoginForm);
    };

    const handleClose = () => {
        setShowLoginForm(false);
        setAnchorEl(null);
        setError('');
    };

    const handleAccountClick = () => {
        navigate('/user-account');
        handleClose();
    };

    const open = Boolean(anchorEl);

    return (
        <Box sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
            <Container maxWidth="xl">
                <StyledToolbar>
                    {/* Logo */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            fontSize: '20px',
                            fontWeight: 'bold',
                            paddingRight: '70px',
                            paddingLeft: '70px'
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
                        />
                    </Search>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Menu Icons */}
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2,
                        paddingRight: '70px'
                    }}>
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
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                }
                            }}
                        >
                            <ShoppingCart />
                            <Typography variant="caption" sx={{ 
                                fontSize: '16px',
                                fontWeight: 600,
                            }}>
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
                                onClick={toggleLoginForm}
                                sx={{ 
                                    display: 'flex', 
                                    gap: 1, 
                                    alignItems: 'center',
                                    color: '#333333',
                                    padding: '8px',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                    }
                                }}
                            >
                                <Person />
                                <Typography variant="caption" sx={{ 
                                    fontSize: '16px',
                                    fontWeight: 600,
                                }}>
                                    {currentUser ? currentUser.fullName : 'User'}
                                </Typography>
                            </IconButton>

                            <Popper
                                open={open}
                                anchorEl={anchorEl}
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
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <Box>
                                                    {!currentUser ? (
                                                        <Box sx={{ p: 3 }}>
                                                            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
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
                                                                        '&:hover': {
                                                                            backgroundColor: '#555555'
                                                                        }
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
                                                                            borderColor: '#1877f2'
                                                                        }
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
                                                                            borderColor: '#db4437'
                                                                        }
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
                                                                    >
                                                                        Register Now
                                                                    </Button>
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    ) : (
                                                        <MenuList>
                                                            <MenuItem onClick={handleAccountClick}>
                                                                <AccountCircle sx={{ mr: 2 }} />
                                                                My Account
                                                            </MenuItem>
                                                            <MenuItem onClick={handleLogout}>
                                                                <Logout sx={{ mr: 2 }} />
                                                                Log out
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
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                }
                            }}
                        >
                            <Language />
                            <Typography variant="caption" sx={{ 
                                fontSize: '16px',
                                fontWeight: 600,
                            }}>
                                Lang
                            </Typography>
                        </IconButton>
                    </Box>
                </StyledToolbar>
            </Container>
        </Box>
    );
} 