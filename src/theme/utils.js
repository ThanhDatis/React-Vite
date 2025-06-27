import { useTheme } from '@mui/material/styles'
import { colors, spacing, shadows, transitions, borderRadius} from './theme';

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

export const createButtonStyle = (variant = 'primary') => {
    const baseStyle = {
        padding: '12px 24px',
        borderRadius: borderRadius.md,
        fontSize: '14px',
        fontWeight: 500,
        textTransform: 'none',
        transition: transitions.md,
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
                boxShadow: shadows.md,
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
                boxShadow: shadows.md,
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
      small: `0 ${spacing.md}`,
      default: `0 ${spacing.xxxl}`,
      large: `0 ${spacing.xxxl}`,
    };
  
    return {
      width: '100%',
      maxWidth,
      margin: '0 auto',
      padding: paddingValues[padding] || paddingValues.default,
      '@media (max-width: 768px)': {
        padding: `0 ${spacing.md}`,
      },
    };
  };

  export const createCardStyle = (elevation = 'medium') => {
    const elevations = {
      none: 'none',
      light: shadows.light,
      medium: shadows.medium,
      dark: shadows.dark,
    };
  
    return {
      backgroundColor: colors.secondary.main,
      borderRadius: borderRadius.large,
      boxShadow: elevations[elevation] || elevations.medium,
      transition: transitions.medium,
      '&:hover': {
        boxShadow: shadows.dark,
        transform: 'translateY(-2px)',
      },
    };
  };

  export const responsive = {
    mobile: '@media (max-width: 767px)',
    tablet: '@media (min-width: 768px) and (max-width: 1023px)',
    desktop: '@media (min-width: 1024px)',
    largeDesktop: '@media (min-width: 1200px)',
  };
  
  export const animations = {
    fadeIn: {
      animation: 'fadeIn 0.3s ease-in-out',
      '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
    },
    slideUp: {
      animation: 'slideUp 0.3s ease-out',
      '@keyframes slideUp': {
        from: { transform: 'translateY(20px)', opacity: 0 },
        to: { transform: 'translateY(0)', opacity: 1 },
      },
    },
    bounce: {
      '&:hover': {
        animation: 'bounce 0.3s ease-in-out',
      },
      '@keyframes bounce': {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-5px)' },
      },
    },
  };

  export const getColorWithOpacity = (color, opacity) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  
  export const darkenColor = (color, amount = 0.1) => {
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.substring(0, 2), 16) - amount * 255);
    const g = Math.max(0, parseInt(hex.substring(2, 4), 16) - amount * 255);
    const b = Math.max(0, parseInt(hex.substring(4, 6), 16) - amount * 255);
    
    return `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
  };