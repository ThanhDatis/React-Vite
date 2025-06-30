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

export const createInputStyle = () => {
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
export const createUserCardStyle = () => ({
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

export const createGridResponsiveColumns = () => ({
    xs: 12,
    sm: 6,
    md: 4,
    lg: 3,
});

const responsive = {
    mobile: '@media (max-width: 767px)',
    tablet: '@media (min-width: 768px) and (max-width: 1023px)',
    desktop: '@media (min-width: 1024px)',
    largeDesktop: '@media (min-width: 1200px)',

    xs: '@media (max-width: 599px)',
    sm: '@media (min-width: 600px)',
    md: '@media (min-width: 960px)',
    lg: '@media (min-width: 1280px)',
    xl: '@media (min-width: 1920px)',

    up: (key) => {
      const bp = {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      };
      return `@media (min-width: ${bp[key]}px)`;
    },

    down: (key) => {
        const bp = {
            xs: 599,
            sm: 899,
            md: 1199,
            lg: 1535,
            xl: 1920,
        };
        return `@media (max-width: ${bp[key]}px)`;
    },

    between: (start, end) => {
      const bp = {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      };
      return `@media (min-width: ${bp[start]}px) and (max-width: ${bp[end] - 1}px)`;
    },
  };

  const createAnimationStyle = (type = 'fadeIn', duration = '0.5s') => {
    const animations = {
        fadeIn: {
          '@keyframes fadeIn': {
            from: { opacity : 0},
            to: { opacity: 1 },
          },
          animation: `fadeIn ${duration} ease-in-out`,
        },
        slideUp: {
          '@keyframes slideUp': {
            from: { transform: 'translateY(20px)', opacity: 0 },
            to: { transform: 'translateY(0)', opacity: 1 },
          },
          animation: `slideUp ${duration} ease-out`,
        },
        slideDown: {
          '@keyframes slideDown': {
            from: { transform: 'translateY(-20px)', opacity: 0 },
            to: { transform: 'translateY(0)', opacity: 1 },
          },
          animation: `slideDown ${duration} ease-out`,
        },
        scaleIn: {
          '@keyframes scaleIn': {
            from: { transform: 'scale(0.8)', opacity: 0 },
            to: { transform: 'scale(1)', opacity: 1 },
          },
          animation: `scaleIn ${duration} ease-out`,
        },
        pulse: {
          '@keyframes pulse': {
            '0%': { transform: 'scale(1)'},
            '50%': { transform: 'scale(1.05)' },
            '100%': { transform: 'scale(1)' }
          },
          animation: `pulse ${duration} ease-in-out infinite`,
        }
    };

    return animations[type] || animations.fadeIn;
  };

const createFlexStyle = (direction = 'row', justify = 'flex-start', align = 'stretch', wrap = 'nowrap') => ({
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    flexWrap: wrap,
});

const createGridStyle = ( gap = spacing.md, minItemWidth = '250px') => ({
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
    gap: `${gap}px`,
    width: '100%',
});

// Form utilities
const createFormFieldStyle = (error = false) => ({
    marginBottom: spacing.lg,
    '& .MuiFormLabel-root': {
        color: error ? colors.status.error : colors.text.secondary,
        fontSize: '0.875rem',
        fontWeight: 500,
    },
    '& .MuiOutlinedInput-root': {
        backgroundColor: colors.secondary.main,
        '& fieldset': {
            borderColor: error ? colors.status.error : colors.border.light,
            transition: transitions.fast,
        },
        '&:hover fieldset': {
            borderColor: error ? colors.status.error : colors.border.dark,
        },
        '&.Mui-focused fieldset': {
            borderColor: error ? colors.status.error : colors.primary.main,
            boxShadow: error ? `0 0 0 2px ${colors.status.error}20` : shadows.focus,
        },
    },
    '& .MuiFormHelperText-root': {
        color: error ? colors.status.error : colors.text.secondary,
        fontSize: '0.75rem',
        marginTop: spacing.xs,
    },
});

// Loading/skeleton utilities
const createSkeletonStyle = (width = '100%', height = '20px', borderRadius = '4px') => ({
    width,
    height,
    borderRadius,
    backgroundColor: colors.border.light,
    background: `linear-gradient(90deg, ${colors.border.light} 25%, ${colors.secondary.light} 50%, ${colors.border.light} 75%)`,
    backgroundSize: '200% 100%',
    animation: 'skeleton-loading 1.5s infinite',
    '@keyframes skeleton-loading': {
        '0%': { backgroundPosition: '200% 0' },
        '100%': { backgroundPosition: '-200% 0' },
    },
});

// Typography utilities
const createTypographyStyle = (variant = 'body1', color = 'primary', weight = 'normal') => {
    const variants = {
        h1: { fontSize: '2rem', lineHeight: 1.2 },
        h2: { fontSize: '1.75rem', lineHeight: 1.3 },
        h3: { fontSize: '1.5rem', lineHeight: 1.3 },
        h4: { fontSize: '1.25rem', lineHeight: 1.4 },
        h5: { fontSize: '1.125rem', lineHeight: 1.4 },
        h6: { fontSize: '1rem', lineHeight: 1.4 },
        body1: { fontSize: '1rem', lineHeight: 1.5 },
        body2: { fontSize: '0.875rem', lineHeight: 1.5 },
        caption: { fontSize: '0.75rem', lineHeight: 1.4 },
    };
    
    const colors_map = {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
        disabled: colors.text.disabled,
        hint: colors.text.hint,
        error: colors.status.error,
        success: colors.status.success,
        warning: colors.status.warning,
        info: colors.status.info,
    };
    
    const weights = {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    };
    
    return {
        ...variants[variant],
        color: colors_map[color] || colors.text.primary,
        fontWeight: weights[weight] || 400,
        margin: 0,
        padding: 0,
    };
};

// Utility for creating consistent spacing
const createSpacingStyle = (top = 0, right = 0, bottom = 0, left = 0) => {
    const getValue = (value) => {
        if (typeof value === 'string') return value;
        return `${spacing[value] || value * 8}px`;
    };
    
    return {
        paddingTop: getValue(top),
        paddingRight: getValue(right),
        paddingBottom: getValue(bottom),
        paddingLeft: getValue(left),
    };
};

// Export all utilities as named exports
export {
    responsive,
    createAnimationStyle,
    createFlexStyle,
    createGridStyle,
    createFormFieldStyle,
    createSkeletonStyle,
    createTypographyStyle,
    createSpacingStyle,
};
