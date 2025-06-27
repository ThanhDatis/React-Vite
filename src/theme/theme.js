import { createTheme } from '@mui/material/styles';

const colors = {
    primary: {
        main: '#000000',
        light: '#333333',
        dark: '#000000',
        contrastText: '#ffffff',
    },
    secondary: {
        main: '#ffffff',
        light: '#f5f5f5',
        dark: '#e0e0e0',
        contrastText: '#000000',
    },
    text: {
        primary: '#333333',
        secondary: '#666666',
        disabled: '#999999',
        hint: '#777777',
    },
    border: {
        light: '#ddd',
        main: '#ccc',
        dark: '#333',
    },
    social: {
        facebook: '#1877f2',
        google: '#db4437',
        instagram: '#e4405f',
    },
    status: {
        error: '#d32f2f',
        success: '#388e3c',
        warning: '#f57c00',
        info: '#1976d2',
    }
};

const spacing =  {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 48,
};

const borderRadius = {
    sm: 3,
    md: 5,
    lg: 8,
    circle: 50,
};

const shadows = {
    light: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.15)',
    dark: '0 8px 16px rgba(0, 0, 0, 0.2)',
    focus: '0 0 0 0.3px rgba(0, 0, 0, 0.1)',
};

const transitions = {
    fast: 'all 0.2s ease',
    medium: 'all 0.3s ease',
    slow: 'all 0.4s ease',
    transform: 'transform 0.2s ease',
    shadow: 'box-shadow 0.3s ease',
};

const typography = {
    fontFamily: 'Roboto, sans-serif',
    h1: {
        fontSize: 30,
        fontWeight: 600,
        lineSpacing: 1,
    },
    h2: {
        fontSize: 24,
        fontWeight: 600,
    },
    h3: {
        fontSize: 18,
        fontWeight: 600,
    },
    body1: {
        fontSize: 16,
        fontWeight: 'normal',
    },
    body2: {
        fontSize: 14,
        fontWeight: 'normal',
    },
    caption: {
        fontSize: 12,
        fontWeight: 'normal',
    },
};

const commonStyles = {
    button: {
        primary: {
            backgroundColor: colors.primary.main,
            color: colors.primary.contrastText,
            border: 'none',
            padding: '12px 40px',
            borderRadius: borderRadius.sm,
            fontSize: 16,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            transition: transitions.medium,
            cursor: 'pointer',
            minWidth: '200px',
            '&:hover': {
                backgroundColor: colors.primary.light,
                transform: 'translateY(-2px)',
                boxShadow: shadows.medium,
            },
            '&:active': {
                transform: 'translateY(0)',
                boxShadow: shadows.light,
            },
            '&:disabled': {
                backgroundColor: colors.border.main,
                transform: 'none',
                boxShadow: 'none',
                cursor: 'not-allowed',
            },
        },
        social: {
            padding: '10px 20px',
            borderRadius: borderRadius.medium,
            border: '1px solid ${colors.border.main}',
            fontSize: 14,
            color: colors.text.primary,
            backgroundColor: colors.secondary.main,
            textTransform: 'none',
            transition: transitions.medium,
            cursor: 'pointer',
            minWidth: '200px',
            '&:hover': {
                border: `1px solid ${colors.border.dark}`,
                transform: 'translateY(-2px)',
                boxShadow: shadows.medium,
                backgroundColor: colors.secondary.main,
            },
            '&:active': {
                transform: 'translateY(0)',
                boxShadow: shadows.light,
            },
        },
    },

    textField: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: colors.border.light,
            },
            '&:hover fieldset': {
                borderColor: colors.border.dark,
            },
            '&.Mui-focused fieldset': {
                borderColor: colors.border.dark,
                boxShadow: shadows.focus,
            },
        },
    },

    container: {
        default: {
            width: '100%',
            padding: '0 100px',
            margin: '20px auto',
        },
        content: {
            padding: '40px 120px',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },

    UploadBox: {
        border: `2px dashed ${colors.border.light}`,
        width: '100px',
        height: '100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        borderRadius: borderRadius.lg,
        transition: transitions.medium,
        backgroundColor: 'transparent',
        '&:hover': {
            borderColor: colors.border.dark,
        },
    },

    divider: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '30px 0',
        width: '100%',
        position: 'relative',
        '&:before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '0',
            width: '100%',
            height: '1px',
            backgroundColor: colors.border.light,
        },
        '&:after': {
            backgroundColor: colors.secondary.main,
            color: colors.text.secondary,
            padding: '0 10px',
            fontSize: 14,
            position: 'relative',
            zIndex: 1,
        },
    },
};

const breakpoints = {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
};


const theme = createTheme({
    palette: {
        primary: colors.primary,
        secondary: colors.secondary,
        text: colors.text,
        error: {
            main: colors.status.error,
        },
        success: {
            main: colors.status.success,    
        },
        warning: {
            main: colors.status.warning,
        },
        info: {
            main: colors.status.info,
        },
    },
    typography: typography,
    spacing: (factor) => `${factor * 4}px`,
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        }
    },
});

export { colors, spacing, borderRadius, shadows, transitions, typography, commonStyles, breakpoints };

export default theme;