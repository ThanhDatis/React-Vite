import { useTheme } from '@mui/material/styles';
import { colors, spacing, shadows, transitions, borderRadius } from './theme';

export const useCustomTheme = () => {
    const muiTheme = useTheme();

    return {
        ...muiTheme,
        custom: {
            colors,
            spacing,
            shadows,
            transitions,
            borderRadius,
        }
    };
};

// UserShow specific styles hook
export const useUserShowStyles = () => {
    const theme = useTheme();
    
    return {
        mainContainer: {
            width: '100%',
            minHeight: '100vh',
            backgroundColor: theme.palette.background.default,
        },
        
        sectionContainer: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
                paddingTop: theme.spacing(4),
                paddingBottom: theme.spacing(4),
            },
        },
        
        container: {
            padding: theme.spacing(0, 2),
            [theme.breakpoints.up('sm')]: {
                padding: theme.spacing(0, 3),
            },
        },
        
        sectionHeader: {
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: theme.spacing(6),
            gap: theme.spacing(4),
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: theme.spacing(2),
                marginBottom: theme.spacing(4),
            },
        },
        
        sectionTitle: {
            color: colors.text.primary,
            fontWeight: 600,
            letterSpacing: '1px',
            fontSize: '1.5rem',
            [theme.breakpoints.down('sm')]: {
                fontSize: '1.25rem',
            },
        },
        
        seeAllLink: {
            color: colors.text.secondary,
            fontSize: '0.875rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: transitions.fast,
            '&:hover': {
                color: colors.text.primary,
                textDecoration: 'underline',
            },
        },
        
        userGrid: {
            width: '100%',
            margin: 0,
            '& .MuiGrid-container': {
                margin: 0,
                width: '100%',
            },
            '& .MuiGrid-item': {
                paddingLeft: 0,
                paddingTop: 0,
                marginBottom: spacing.lg,
            },
        },
        
        userCard: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${colors.border.light}`,
            borderRadius: borderRadius.lg,
            boxShadow: shadows.card,
            backgroundColor: colors.secondary.main,
            transition: transitions.hover,
            cursor: 'default',
            '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: shadows.cardHover,
            },
        },
        
        userCardContent: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(3, 2),
            flexGrow: 1,
            textAlign: 'center',
        },
        
        userCardActions: {
            padding: theme.spacing(0, 2, 3),
            justifyContent: 'center',
        },
        
        userAvatar: {
            width: 120,
            height: 120,
            marginBottom: theme.spacing(2),
            border: `2px solid ${colors.border.light}`,
            [theme.breakpoints.down('sm')]: {
                width: 100,
                height: 100,
            },
        },
        
        userName: {
            color: colors.text.primary,
            fontWeight: 600,
            fontSize: '1.125rem',
            marginBottom: theme.spacing(0.5),
            textAlign: 'center',
        },
        
        userUsername: {
            color: colors.text.secondary,
            fontSize: '0.875rem',
            marginBottom: theme.spacing(2),
            textAlign: 'center',
        },
        
        socialIconsContainer: {
            display: 'flex',
            gap: theme.spacing(1),
            marginBottom: theme.spacing(2.5),
            justifyContent: 'center',
        },
        
        socialIcon: {
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: `1px solid ${colors.border.light}`,
            backgroundColor: colors.secondary.main,
            transition: transitions.hover,
            '&:hover': {
                transform: 'scale(1.1)',
                borderColor: 'transparent',
            },
        },
        
        shopButton: {
            backgroundColor: colors.primary.main,
            color: colors.primary.contrastText,
            fontWeight: 600,
            fontSize: '0.875rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            padding: theme.spacing(1.5, 2.5),
            borderRadius: 0,
            border: 'none',
            minWidth: '160px',
            transition: transitions.hover,
            '&:hover': {
                backgroundColor: colors.primary.light,
                transform: 'translateY(-2px)',
                boxShadow: shadows.cardHover,
            },
            '&:active': {
                transform: 'translateY(0)',
                boxShadow: shadows.card,
            },
        },
    };
};

// General button styles creator
export const createButtonStyle = (variant = 'primary') => {
    const baseStyle = {
        padding: '12px 24px',
        borderRadius: borderRadius.md,
        fontSize: '14px',
        fontWeight: 500,
        textTransform: 'none',
        transition: transitions.medium,
        cursor: 'pointer',
    };

    const variants = {
        primary: {
            ...baseStyle,
            backgroundColor: colors.primary.main,
            color: colors.primary.contrastText,
            border: 'none',
            '&:hover': {
                backgroundColor: colors.primary.light,
                transform: 'translateY(-1px)',
                boxShadow: shadows.medium,
            },
        },
        secondary: {
            ...baseStyle,
            backgroundColor: 'transparent',
            color: colors.primary.main,
            border: `1px solid ${colors.primary.main}`,
            '&:hover': {
                backgroundColor: colors.primary.main,
                color: colors.primary.contrastText,
                transform: 'translateY(-1px)',
                boxShadow: shadows.medium,
            },
        },
        social: {
            ...baseStyle,
            backgroundColor: colors.secondary.main,
            color: colors.text.primary,
            border: `1px solid ${colors.border.main}`,
            '&:hover': {
                border: `1px solid ${colors.border.dark}`,
                transform: 'translateY(-1px)',
                boxShadow: shadows.medium,
            },
        },
        shop: {
            ...baseStyle,
            backgroundColor: colors.primary.main,
            color: colors.primary.contrastText,
            fontWeight: 600,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            borderRadius: 0,
            '&:hover': {
                backgroundColor: colors.primary.light,
                transform: 'translateY(-2px)',
                boxShadow: shadows.cardHover,
            },
        },
    };

    return variants[variant] || variants.primary;
};

export const createInputStyle = (variant = 'outlined') => {
    return {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: colors.border.light,
                transition: transitions.fast,
            },
            '&:hover fieldset': {
                borderColor: colors.border.dark,
            },
            '&.Mui-focused fieldset': {
                borderColor: colors.primary.main,
                boxShadow: shadows.focus,
            },
        },
        '& .MuiInputLabel-root': {
            color: colors.text.secondary,
            '&.Mui-focused': {
                color: colors.primary.main,
            },
        },
    };
};

export const createContainerStyle = (maxWidth = '1200px', padding = 'default') => {
    const paddingValues = {
        none: '0',
        small: `0 ${spacing.md}px`,
        default: `0 ${spacing.xl}px`,
        large: `0 ${spacing.xxxl}px`,
    };

    return {
        width: '100%',
        maxWidth,
        margin: '0 auto',
        padding: paddingValues[padding] || paddingValues.default,
        '@media (max-width: 768px)': {
            padding: `0 ${spacing.md}px`,
        },
    };
};

export const createCardStyle = (elevation = 'medium') => {
    const elevations = {
        none: 'none',
        light: shadows.light,
        medium: shadows.medium,
        dark: shadows.dark,
        card: shadows.card,
        cardHover: shadows.cardHover,
    };

    return {
        backgroundColor: colors.secondary.main,
        borderRadius: borderRadius.lg,
        boxShadow: elevations[elevation] || elevations.medium,
        transition: transitions.medium,
        '&:hover': {
            boxShadow: elevations.cardHover || shadows.dark,
            transform: 'translateY(-2px)',
        },
    };
};

// UserShow specific utilities
export const createUserCardStyle = (theme) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${colors.border.light}`,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.card,
    backgroundColor: colors.secondary.main,
    transition: transitions.hover,
    cursor: 'default',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: shadows.cardHover,
    },
});

export const createSocialIconStyle = (socialColor) => ({
    width: 32,
    height: 32,
    borderRadius: '50%',
    border: `1px solid ${colors.border.light}`,
    backgroundColor: colors.secondary.main,
    transition: transitions.hover,
    '&:hover': {
        transform: 'scale(1.1)',
        borderColor: 'transparent',
        backgroundColor: socialColor,
        '& .MuiSvgIcon-root': {
            color: '#ffffff',
        },
    },
});

export const createGridResponsiveColumns = (theme) => ({
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
});

export const responsive = {
    mobile: '@media (max-width: 767px)',
    tablet: '@media (min-width: