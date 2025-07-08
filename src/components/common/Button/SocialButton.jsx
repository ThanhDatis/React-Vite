import { Opacity } from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';

export const SocialButton = styled(IconButton, {
    shouldForwardProp: (prop) => prop !== 'bgColor',
})(({ theme, bgColor }) => ({
    backgroundColor: bgColor || theme.palette.primary.main,
    color: 'white',
    width: 40,
    height: 40,
    transition: 'all 0.3s ease-in-out',

    [theme.breakpoints.down('sm')]: {
        width: 36,
        height: 36,
    },

    '&:hover': {
        backgroundColor: bgColor || theme.palette.primary.main,
        opacity: 0.8,
        transform: 'scale(1.1)',
    },
    '&:focus': {
        outline: '2px solid',
        outlineColor: theme.palette.primary.main,
        outlineOffset: '2px',
    },
}));