import { Box, Paper } from '@mui/material';

const PAYMENT_ICONS = {
    mastercard: {
        name: "Mastercard",
        svg: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="16" r="9" fill="#E80B26"/>
                <circle cx="22" cy="16" r="9" fill="#F59D31"/>
                <path d="M16 22.7083C17.8413 21.0603 19 18.6655 19 16C19 13.3345 17.8413 10.9397 16 9.29175C14.1587 
                10.9397 13 13.3345 13 16C13 18.6655 14.1587 21.0603 16 22.7083Z" fill="#FC6020"/>
            </svg>
        )
    },
    paypal: {
        name: "PayPal",
        svg: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.8485 9.61723C25.1602 7.58517 24.8485 6.23046 23.7576 4.97996C22.5629 3.57315 20.3813 3 17.5762 3H9.52484C8.95345 3 8.48595 3.41683 8.38206 3.98998L5.00566 25.3527C4.95372 25.7695 
                5.26539 26.1343 5.68094 26.1343H10.6676L10.304 28.3226C10.2521 28.6874 10.5118 29 10.9273 29H15.1349C15.6543 29 16.0699 28.6353 16.1218 28.1663L17.0049 22.6433C17.0568 22.1743 17.5243 21.8096 
                17.9918 21.8096H18.6151C22.6668 21.8096 25.8874 20.1423 26.8224 15.3487C27.186 13.3687 27.0302 11.6493 25.9913 10.503C25.6796 10.1383 25.316 9.87776 24.8485 9.61723Z" fill="#009CDE"/>
                <path d="M24.8485 9.61723C25.1601 7.58517 24.8485 6.23046 23.7576 4.97996C22.5629 3.57315 20.3813 3 17.5762 3H9.52484C8.95345 3 8.48595 3.41683 8.38206 3.98998L5.00566 25.3527C4.95372 25.7695 
                5.26539 26.1343 5.68094 26.1343H10.6676L11.8623 18.4228C11.9662 17.8497 12.4337 17.4329 13.0051 17.4329H15.3946C20.0696 17.4329 23.7057 15.5571 24.7446 10.0341C24.7965 9.92986 24.7965 9.77355 
                24.8485 9.61723Z" fill="#012169"/>
                <path d="M13.2648 9.66934C13.3168 9.30461 13.7843 8.83567 14.2518 8.83567H20.589C21.3163 8.83567 22.0435 8.88777 22.6668 8.99198C23.2382 9.09619 24.2771 9.35671 24.7965 9.66934C25.1082 7.63727 
                24.7965 6.28257 23.7057 5.03206C22.5629 3.57315 20.3813 3 17.5762 3H9.52484C8.95345 3 8.48595 3.41683 8.38206 3.98998L5.00566 25.3527C4.95372 25.7695 5.26539 26.1343 5.68094 26.1343H10.6676L13.2648 
                9.66934Z" fill="#003087"/>
            </svg>
        )
    },
    amex: {
        name: "American Express",
        svg: (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="4" fill="#006FCF"/>
                <path d="M8.5 8h2.2l.5 1.2.5-1.2h2.2l-1.6 2.1L14.2 24h-2.2l-.5-1.3-.5 1.3H8.8l1.6-2.1L8.5 8zm6.8 
                0h4.5v1.5h-2.4v.8h2.3v1.4h-2.3v1h2.4V24h-4.5V8zm5.2 0h2.1l1.2 3.2L24.8 8h2.1l-2.1 6h-1.8L21.5 8z" fill="white"/>
            </svg>
        )
    },
};

/**
 * Individual Payment Icon Component
 * @param {string} type - Payment type (mastercard, visa, amex, paypal)
 * @param {string} size - Size variant (small, medium, large)
 * @param {object} sx - Additional styling
 * @param {number} elevation - Paper elevation
 * @param {boolean} hover - Enable hover effects
 */

const PaymentIcon = ({
    type,
    size = "medium",
    sx = {},
    elevation = 1,
    hover = true
}) => {
    const iconData = PAYMENT_ICONS[type];

    if (!iconData) {
        console.warn(`Payment type '${type}' not found`);
        return null;
    }

    const sizeConfig = {
        small: { width: 40, height: 25 , iconScale: 0.7 },
        medium: { width: 45, height: 30 , iconScale: 0.8 },
        large: { width: 56, height: 35 , iconScale: 0.9 },
    };

    const { width, height, iconScale } = sizeConfig[size];

    return (
        <Paper
            elevation={elevation}
            sx={{
                width,
                height,
                borderRadius: 1,
                border: "1px solid",
                borderColor: "grey.300",
                backgroundColor: 'background.paper',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: hover ? 'all 0.2s ease-in-out' : 'none',
                cursor: hover ? 'pointer' : 'default',
                ...(hover && {
                    '&:hover': {
                        elevation: elevation + 1,
                        borderColor: 'primary.main',
                        transform: 'translateY(-1px)'
                    }
                }),
                ...sx
            }}
            role="img"
            aria-label={`${iconData.name} payment method`}
            >
                <Box
                sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: `scale(${iconScale})`,
                '& svg': {
                    maxWidth: '100%',
                    maxHeight: '100%'
                }
                }}
            >
                {iconData.svg}
            </Box>
        </Paper>
    );
};

/**
 * Payment Icons Group component
 * @param {Array<string>} types - Array of payment types to display
 * @param {string} size - Size variant for all icons
 * @param {object} containerSx - Styling for container
 */

export const PaymentIconGroup = ({
    types = ['mastercard', 'visa'],
    size = 'medium',
    containerSx = {}
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: 1,
                ...containerSx
            }}
            role="img"
            aria-label='Accepted payment methods'
        >
            {types.map(type => (
                <PaymentIcon
                    key={type}
                    type={type}
                    size={size}
                />
            ))}
        </Box>
    );
};

export default PaymentIcon;