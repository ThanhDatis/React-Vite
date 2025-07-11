import { Button, CircularProgress, styled } from "@mui/material";

export const SubmitButton = styled(Button)(({ theme }) => ({
    fontWeight: "bold",
    textTransform: 'uppercase',
    fontSize: '14px',
    padding: '10px 24px',
    transition: 'all 0.3s ease-in-out',
    position: 'relative',
    overflow: 'hidden',

    "&::before": {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 0,
        height: 0,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)',
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.6s, height 0.6s',
    },
    "&:hover::before": {
        width: '300px',
        height: '300px',
    },
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[8],
    },
    '&:active': {
        transform: 'translateY(0)',
    },
    '&:disabled': {
        opacity: 0.7,
        cursor: 'not-allowed',
    },
    '&.MuiButton-containedPrimary': {
        backgroundColor: '#333333',
        color: 'white',
        '&:hover': {
            backgroundColor: '#555555',
        },
    },
    '&.MuiButton-containedSecondary': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
        }
    },
    '&:loading': {
        color: 'transparent',
    },
}));

export const SubmitButtonWithLoading = ({ children, loading, ...props }) => {
    return (
        <SubmitButton
            className={loading ? 'loading' : ''}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading && ( 
                <CircularProgress
                    size={20}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-10px',
                        marginLeft: '-10px',
                        color: 'inherit',
                    }}
                /> 
            )}
            {children}
        </SubmitButton>
    );
};