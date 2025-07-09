import React, { useState } from 'react';
import { Tooltip, alpha, styled, TextField } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.background.paper,
        fontSize: '14px',
        transition: 'all 0.2s ease-in-out',

        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
        },

        '&.mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.main,
        },
    },
}));

const ErrorTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }}/>
))(({ theme }) => ({
    '&.MuiTooltip-tooltip': {
        backgroundColor: alpha(theme.palette.error.main, 0.9),
        color: theme.palette.error.contrastText,
        fontSize: '12px',
        padding: '8px 12px',
        borderRadius: '4px',
        fontWeight: 400,
        maxWidth: 220,

        '& .MuiTooltip-arrow': {
            color: alpha(theme.palette.error.main, 0.9),
        },
    },
}));

/**
 * ValidatedTextField Component
 * @param {string} value - Input value
 * @param {function} onChange - Change handler
 * @param {function} onBlur - Blur handler
 * @param {string} error - Error message
 * @param {boolean} showError - Whether to show error
 * @param {string} placeholder - Placeholder text
 * @param {string} type - Input type
 * @param {boolean} disabled - Whether input is disabled
 * @param {object} inputProps - Additional input props
 * @param {object} sx - Additional styles
 * @param {string} size - Input size
 * @param {boolean} fullWidth - Whether to take full width
 * @param {string} variant - TextField variant
 */

export const ValidatedTextField = ({
    value,
    onChange,
    onBlur,
    onFocus,
    error = '',
    showError = false,
    placeholder = '',
    type = 'text',
    disabled = false,
    inputProps = {},
    sx ={},
    size = 'small',
    fullWidth = false,
    variant = 'outlined',
    tooltipPlacement = 'top',
    ...otherProps
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const handleFocus = (e) => {
        setIsFocused(true);
        if (error & showError) {
            setTooltipOpen(true);
        }
        if (onFocus) {
            onFocus(e);
        }
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        setTooltipOpen(false);
        if (onBlur) {
            onBlur(e);
        }
    };

    const handleChange = (e) => {
        if (error & showError & e.target.value) {
            setTooltipOpen(true);
        }
        if (onChange) {
            onChange(e);
        }
    };

    React.useEffect(() => {
        if (tooltipOpen && error) {
            const timer = setTimeout(() => {
                setTooltipOpen(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [tooltipOpen, error]);

    React.useEffect(() => {
        if (error & showError & isFocused) {
            setTooltipOpen (true);
        }
    }, [error, isFocused, showError]);

    return (
        <ErrorTooltip 
            title={error || ''}
            open={tooltipOpen && Boolean(error) && showError}
            placement={tooltipPlacement}
            arrow
        >
            <StyledTextField 
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                error={Boolean(error) && showError}
                size={size}
                fullWidth={fullWidth}
                variant={variant}
                inputProps={{
                    ...inputProps,
                    'aria-describedby': error && showError ? 'email-error' : undefined, 
                }}
                sx={sx}
                {...otherProps}
            />
        </ErrorTooltip>
    );
};

