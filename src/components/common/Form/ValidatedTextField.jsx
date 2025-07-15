import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

    '&.MuiInputLabel-root': {
        fontSize: '14px',
        '&.Mui-focused': {
            color: theme.palette.primary.main,
        },
        '&.Mui-error': {
            color: theme.palette.error.main,
        },
    }
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
        boxShadow: theme.shadows[4],

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
    name,
    label,
    helperText,
    autoComplete,
    ...otherProps
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const handleFocus = useCallback((e) => {
        setIsFocused(true);
        if (error & showError) {
            setTooltipOpen(true);
        }
        onFocus?.(e);
    }, [error, showError, onFocus]);

    const handleBlur = useCallback((e) => {
        setIsFocused(false);
        setTooltipOpen(false);
        onBlur?.(e);
    }, [onBlur]);

    const handleChange = useCallback((e) => {
        if (error & showError & e.target.value) {
            setTooltipOpen(false);
        }
        onChange?.(e);
    }, [onChange, error, showError]);

    useEffect(() => {
        if (tooltipOpen && error) {
            const timer = setTimeout(() => {
                setTooltipOpen(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [tooltipOpen, error]);

    useEffect(() => {
        if (error & showError & isFocused) {
            setTooltipOpen (true);
        } else if (!error) {
            setTooltipOpen(false);
        }
    }, [error, isFocused, showError]);

    const hasError = useMemo(() => Boolean(error) && showError, [error, showError]);
    const shouldShowTooltip = useMemo(() =>
        tooltipOpen && Boolean(error) && showError,
        [tooltipOpen, error, showError]);

    return (
        <ErrorTooltip 
            title={error || ''}
            open={shouldShowTooltip}
            placement={tooltipPlacement}
            arrow
            disableHoverListener
            disableFocusListener
            disableTouchListener
        >
            <StyledTextField
                name={name}
                label={label} 
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                error={hasError}
                helperText={!showError && hasError ? error : helperText}
                size={size}
                fullWidth={fullWidth}
                variant={variant}
                autoComplete={autoComplete}
                inputProps={{
                    ...inputProps,
                    'aria-describedby': error && showError ? 'email-error' : undefined, 
                    'aria-invalid': hasError,
                }}
                sx={sx}
                {...otherProps}
            />
        </ErrorTooltip>
    );
};

