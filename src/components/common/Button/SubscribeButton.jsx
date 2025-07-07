import { Button, styled } from "@mui/material";

export const SubscribeButton = styled(Button)(({ theme }) => ({
    minWidth: '140px',
    fontWeight: 'bold',
    textTransform: 'none',
    transition: 'all 0.2s ease-in-out',
    
    // Mobile full width
    [theme.breakpoints.down('sm')]: {
        minWidth: '100%',
    },
    
    '&:hover': {
        transform: 'translateY(-1px)',
        boxShadow: theme.shadows[4],
    },
    
    '&:disabled': {
        opacity: 0.6,
        cursor: 'not-allowed',
    }
}));