import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const LinkTypography = styled(Link)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textDecoration: 'none',
    fontSize: '14px',
    display: 'block',
    padding: theme.spacing(0.5, 0),
    transition: 'all 0.2s ease-in-out',
    [theme.breakpoints.down('sm')]: {
        fontSize: '13px',
    },

    '&.hover': {
        color: theme.palette.text.primary,
        textDecoration: 'underline',
        paddingLeft: theme.spacing(0.5)
    },

    '&.focus': {
        outline: '2px solid',
        outlineColor: theme.palette.primary.main,
        outlineOffset: '2px',
        BorderRadius: theme.spacing(0.5)
    },
}));
