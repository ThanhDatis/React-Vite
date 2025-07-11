import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth'; 
// import { HEADER_DATA  } from '../data/headerData';

export const useHeader = () => {
    const navigate = useNavigate();
    const { currentUser, login, logout } = useAuth();

    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);
    const [brandsMenuAnchor, setBrandsMenuAnchor] = useState(null);
    const [brandMenuOpen, setBrandMenuOpen] = useState(false);

    //form state
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Search state
    const [searchValue, setSearchValue] = useState('');

    const isUserMenuOpen = Boolean(userMenuAnchor);
    const isBrandsMenuOpen = Boolean(brandsMenuAnchor);

    const userDisplayName = useMemo(() => {
        return currentUser ? currentUser.fullname : 'User';
    }, [currentUser]);

    const resetLoginForm = useCallback(() => {
        setShowLoginForm(false);
        setUsername('');
        setPassword('');
        setError('');
    }, []);

    const closeAllMenus = useCallback(() => {
        setShowLoginForm(false);
        setUserMenuAnchor(null);
        setBrandMenuOpen(null);
        setMobileDrawerOpen(false);
        setError('');
    }, []);

    //Handle
    const handleLogin = useCallback(async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const success = await login(username, password);
            if (success) {
                resetLoginForm();
                closeAllMenus();    
            } else {
                setError('Invalid username or password');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [username, password, login, resetLoginForm, closeAllMenus]);
    
    const handleLogout = useCallback(() => {
        logout();
        closeAllMenus()
    }, [logout, closeAllMenus]);
    
    const handleUserMenuToggle = useCallback((event) => {
        setUserMenuAnchor(userMenuAnchor ? null : event.currentTarget);
        setShowLoginForm(!showLoginForm);
    }, [userMenuAnchor, showLoginForm]);

    const handleBrandsMenuOpen = useCallback((event) => {
        setBrandsMenuAnchor(event.currentTarget);
    }, []);

    const handleBrandsMenuClose = useCallback(() => {
        setBrandsMenuAnchor(null);
    }, []);

    const handleBrandMenuToggle = useCallback(() => {
        setBrandMenuOpen(!brandMenuOpen);
    }, [brandMenuOpen]);

    const handleMobileDrawerToggle = useCallback(() => {
        setMobileDrawerOpen(!mobileDrawerOpen);
        if (!mobileDrawerOpen) {
            setShowLoginForm(false);
            setError('');
        }
    }, [mobileDrawerOpen]);

    const handleAccountClick = useCallback(() => {
        navigate('/user-account');
        closeAllMenus();
    }, [navigate, closeAllMenus]);

    const handleCartClick = useCallback(() => {
        navigate('/cart');
        closeAllMenus();
    }, [navigate, closeAllMenus]);

    const handleBrandClick = useCallback((brand) => {
        console.log('Navigate to brand:', brand);
        navigate(`/brand/${brand.toLowerCase()}`);
        handleBrandsMenuClose();
    }, [navigate, handleBrandsMenuClose]);

    const handleSearch = useCallback((e) => {
        e.preventDefault();
        if (searchValue.trim()) {
            console.log('Searching for:', searchValue);
            navigate(`/search?q=${encodeURIComponent(searchValue)}`);
            closeAllMenus();
        }
    }, [closeAllMenus, navigate, searchValue]);

    const handleSearchChange = useCallback((value) => {
        setSearchValue(value);
    }, []);

    return {
        states: {
            mobileDrawerOpen,
            userMenuAnchor,
            brandMenuOpen,
            brandsMenuAnchor,
            showLoginForm,
            username,
            password,
            error,
            isLoading,
            searchValue,
            currentUser,
        },
        computed: {
            isBrandsMenuOpen,
            isUserMenuOpen,
            userDisplayName,
        },
        handles: {
            handleLogin,
            handleLogout,
            handleUserMenuToggle,
            handleBrandMenuToggle,
            handleMobileDrawerToggle,
            handleBrandsMenuOpen,
            handleBrandsMenuClose,
            handleBrandClick,
            handleCartClick, 
            handleAccountClick,
            handleSearch,
            handleSearchChange,
        },
        setters: {
            setUsername,
            setPassword,
            setError,
            setSearchValue,
        },
        utils: {
            resetLoginForm,
            closeAllMenus,
        },
    };
};

export const useHeaderScroll = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useCallback(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setIsScrolled(currentScrollY > 50);

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);        
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return { isScrolled, isVisible};
};

export const useSearchSuggestions = (searchValue) => {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

    useCallback(() => {
        if (!searchValue || searchValue.length < 2)  {
            setSuggestions([]);
            return;
        }
        const timer = setTimeout(async () => {
            setIsLoadingSuggestions(true);
            try {
                const mockSuggestions = [
                    `${searchValue} skincare`,
                    `${searchValue} makeup`,
                    `${searchValue} haircare`,
                ];
                setSuggestions(mockSuggestions);
            } catch (error) {
                console.log('Error fetching suggestions:', error)
                setSuggestions([]);
            } finally {
                setIsLoadingSuggestions(false);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchValue]);
    return { suggestions, isLoadingSuggestions};
};