import React, { useState } from 'react';
import {
  Grid,
  Avatar,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Facebook,
  Google,
  Instagram,
  Add
} from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Breadcrumb from '../components/ui/Breadcrumb/Breadcrumb';
import { 
    StyledContainer, 
    PageTitle, 
    ContentContainer, 
    SocialButton, 
    UploadContainer, 
    UploadBox, 
    FormSection, 
    SectionTitle, 
    StyledTextField, 
    SubmitButton, 
    StyledDivider,
    UploadText
} from '../assets/styles/RegistrationStyle';

const validationSchema = Yup.object({
    firstName: Yup.string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must be less than 50 characters')
        .required('First name is required'),
    lastName: Yup.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must be less than 50 characters')
        .required('Last name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    mobile: Yup.string()
        .matches(/^[0-9]{10,11}$/, 'Mobile number must be 10-11 digits')
        .required('Mobile number is required'),
    street: Yup.string()
        .min(5, 'Street must be at least 5 characters')
        .max(100, 'Street must be less than 100 characters')
        .required('Street is required'),
    area: Yup.string()
        .min(5, 'Area must be at least 5 characters')
        .required('Area is required'),
    emirate: Yup.string()
        .required('Emirate is required'),
});

const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    street: '',
    area: '',
    emirate: '',
};

const FormField = ({ name, label, type = 'text', ...props }) => (
    <Field name={name}>
        {({ field, meta }) => (
            <StyledTextField
                {...field}
                {...props}
                fullWidth
                label={label}
                type={type}
                variant="outlined"
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
            />
        )}
    </Field>
);

export default function Registration() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [uploadedImage, setUploadedImage] = useState(null);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Registration' }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        if (file.size > 1024 * 1024 * 5) {
            alert('Image size must be less than 5MB');
            return;
        }


        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  const handleSubmit = async (values, { setSubmitting, setStatus}) => {
    try {
        setStatus(null);
        console.log('Form submitted:', values);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        alert('Registration successful');

    } catch (error) {
        setStatus('Registration failed');
        console.error('Form submission error:', error);
    } finally{
        setSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <StyledContainer maxWidth={false}>
        <ContentContainer sx={{ py: 0}}>
        <PageTitle variant="h1" 
        sx={{ fontSize: '30px', fontWeight: 'bold', letterSpacing: 1 }}>
            Registration
        </PageTitle>
          {/* Social Login Buttons */}
          <Stack 
            direction={isMobile ? 'column' : 'row'} 
            spacing={isMobile ? 2 : 5}
            width="100%"
            alignItems="center"
            justifyContent="center"
          >
            <SocialButton
              startIcon={<Facebook sx={{ color: '#1877F2' }} />}
              onClick={() => handleSocialLogin('Facebook')}
            >
              Register with Facebook
            </SocialButton>
            <SocialButton
              startIcon={<Google sx={{ color: '#DB4437' }} />}
              onClick={() => handleSocialLogin('Google')}
            >
              Register with Google+
            </SocialButton>
            <SocialButton
              startIcon={<Instagram sx={{ color: '#E4405F' }} />}
              onClick={() => handleSocialLogin('Instagram')}
            >
              Register with Instagram
            </SocialButton>
          </Stack>

          {/* Divider */}
          <StyledDivider>
            <span>OR</span>
          </StyledDivider>

          {/* Profile Picture Upload */}
          <SectionTitle>Profile Picture</SectionTitle>
          <UploadContainer>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-button"
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="upload-button">
              <UploadBox component="div">
                {uploadedImage ? (
                  <Avatar
                    src={uploadedImage}
                    sx={{ width: 80, height: 80 }}
                  />
                ) : (
                  <>
                    <Add sx={{ fontSize: 24, color: '#333' }} />
                    <UploadText>Upload Image</UploadText>
                  </>
                )}
              </UploadBox>
            </label>
          </UploadContainer>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {({ isSubmitting, status }) => (
                <Form style={{ width: '100%' }}>
                    <FormSection>
                        <SectionTitle>Personal Information</SectionTitle>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <FormField name="firstName" label="First Name" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormField name="lastName" label="Last Name" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormField name="email" label="Email Address" type="email"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormField name="mobile" label="Mobile Number" />
                            </Grid>
                        </Grid>
                    </FormSection>

                    <FormSection>
                        <SectionTitle>Address Information</SectionTitle>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <FormField name="street" label="Street" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormField name="area" label="Area" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormField name="emirate" label="Emirate" />
                            </Grid>
                        </Grid>
                    </FormSection>

                    {status && (
                        <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
                            {status}
                        </div>
                    )}

                    <SubmitButton type="submit" disabled={isSubmitting} >
                        {isSubmitting ? 'Registering...' : 'Register'}
                    </SubmitButton>
                </Form>
            )}
          </Formik>
        </ContentContainer>
      </StyledContainer>
    </>
  );
}
          