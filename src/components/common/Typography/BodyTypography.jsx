 import { styled, Typography } from "@mui/material";

 export const BodyTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    lineHeightL: 1.6,
    fontSize: '14px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '12px',
    },

    '&.MuiTypography-caption': {
        fontSize: '12px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '11px',
        },
    },
 }));
