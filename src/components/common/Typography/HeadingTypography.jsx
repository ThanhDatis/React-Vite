import { styled, Typography } from "@mui/material";

export const HeadingTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    fontSize: '16px', 
    [theme.breakpoints.down('sm')]: {
        fontSize: '14px',
        marginBottom: theme.spacing(1.5),
    },

    '&.MuiTypography-h5': {
        fontWeight: 700,
        fontSize: '18px',
        [theme.breakpoints.down('md')]: {
            fontSize: '16px',
        },
    },
}));
