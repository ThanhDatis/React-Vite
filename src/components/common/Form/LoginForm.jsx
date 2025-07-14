import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { 
    Box, 
    Typography,
    Alert,
    Button,
    Divider,
    IconButton,
    InputAdornment
} from '@mui/material';
import {
    Visibility, 
    VisibilityOff,
    Person,
    Lock
} from '@mui/icons-material';
import { ValidatedTextField } from './ValidatedTextField';
import { SubmitButtonWithLoading } from '../Button/SubmitButton';
import { SocialButton } from '../Button/SocialButton';
import { Facebook, Google } from '@mui/icons-material';


const loginSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters')
        .max(50, 'Username must be at most 50 characters')
        .required('Username is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

/**
 * LoginForm Component
 * @param {function} onSubmit - Form submission handler
 * @param {string} error - Server error message
 * @param {function} onClose - Close form handler
 * @param {boolean} isLoading - Loading state
 * @param {function} onSocialLogin - Social login handler
 */

export const LoginForm = ({ 
    onSubmit, 
    error, 
    onClose, 
    isLoading = false, 
    onSocialLogin,
    showSocialLogin = true,
    showForgotPassword = true,
    showRegisterLink = true,
    showRememberMe = true
}) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showForgotPassword);
    };
    return (
        <Box sx={{ 
            p: 3, 
            width: '100%', 
            maxWidth: 400, 
            boxShadow: 2,
            backgroundColor: 'white',
            }}>
            <Typography variant="h6"
                sx={{
                    mb: 3,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: 1
                }}
            >
                Sign in
            </Typography>

            {error && (
                <Alert 
                severity="error"
                sx={{ mb: 2 }}
                onClose={() => {}}
            >
                {error}
                </Alert>
            )}

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false,
                }}
                validationSchema={loginSchema}
                onSubmit={onSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                }) => (
                    <Form>
                        <ValidatedTextField 
                            fullWidth
                            name="username"
                            placeholder="Enter Username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!errors.username && touched.username}
                            sx={{ mb: 2 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person sx={{ color: 'action.active' }}/>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <ValidatedTextField 
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter Password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!errors.password && touched.password}
                            sx={{ mb: 1 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock sx={{ color: 'action.active' }}/>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton 
                                            onClick={handleTogglePassword}
                                            edge="end"
                                            size="small"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 2,
                            }}
                        >
                            {showRememberMe && (
                                <label>
                                    <input 
                                        type='checkbox'
                                        name="rememberMe"
                                        checked={values.rememberMe}
                                        onChange={handleChange}
                                        style={{ marginRight: 8 }}
                                    />
                                    <Typography variant='body2' component='span'>
                                        Remember me
                                    </Typography>
                                </label>
                            )}

                            {showForgotPassword && (
                                <Button 
                                    component={Link}
                                    to="/forgot-password"
                                    size='small'
                                    sx={{
                                        textTransform: 'none',
                                        fontSize: 12,
                                        p: 0,
                                        minWidth: 'auto',
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}
                                    onClick={onClose}
                                >
                                    Forgot password?
                                </Button>
                            )}
                        </Box>

                        <SubmitButtonWithLoading
                            type='submit'
                            fullWidth
                            variant='contained'
                            loading={isLoading || isSubmitting}
                            sx={{ mb: 1 }}
                        >
                            Sign in
                        </SubmitButtonWithLoading>

                        {showSocialLogin && (
                            <>
                                <Divider sx={{ my: 2 }}>
                                    <Typography variant='body2' color='text.secondary'>
                                        Or sign in with
                                    </Typography>
                                </Divider>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                    <Button 
                                        fullWidth
                                        variant='outlined'
                                        startIcon={
                                            <SocialButton
                                                bgColor="#1877f2"
                                                size='small'
                                                sx={{ width: 24, height: 24 }}
                                            >
                                                <Facebook sx={{ fontSize: 16}}/>
                                            </SocialButton>
                                        }
                                        sx={{
                                            color: '#1877f2',
                                            borderColor: '#1877f2',
                                            textTransform: 'none',
                                            justifyContent: 'flex-start',
                                            pl: 2,
                                            '&:hover': {
                                                backgroundColor: 'rgba(24, 119, 242, 0.04)',
                                                borderColor: '#1877f2',
                                            },
                                        }}
                                        onClick={() => onSocialLogin?.('facebook')}
                                    >
                                        Login with Facebook
                                    </Button>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={
                                            <SocialButton 
                                                bgColor="#db4437" 
                                                size="small"
                                                sx={{ width: 24, height: 24 }}
                                            >
                                                <Google sx={{ fontSize: 16 }} />
                                            </SocialButton>
                                        }
                                        sx={{
                                            color: '#db4437',
                                            borderColor: '#db4437',
                                            textTransform: 'none',
                                            justifyContent: 'flex-start',
                                            pl: 2,
                                            '&:hover': {
                                                backgroundColor: 'rgba(219, 68, 55, 0.04)',
                                                borderColor: '#db4437',
                                            },
                                        }}
                                        onClick={() => onSocialLogin?.('google')}
                                    >
                                        Login with Google
                                    </Button>
                                </Box>
                            </>
                        )}

                        {showRegisterLink && (
                            <Typography variant='body2' sx={{ textAlign: 'center', mt: 2 }}>
                                New Member?{' '}
                                <Button
                                    component={Link}
                                    to='/registration'
                                    size='small'
                                    sx={{
                                        textTransform: 'none',
                                        p: 0,
                                        minWidth: 'unset',
                                        fontWeight: 600, 
                                        '&:hover': {
                                            textDecoration: 'underline'
                                        }
                                    }}
                                    onClick={onClose}
                                >
                                    Register Now
                                </Button>
                            </Typography>
                        )}
                    </Form>
                )}
            </Formik>
        </Box>
    )
};
