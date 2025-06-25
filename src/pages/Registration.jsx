import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
  Divider,
  Avatar,
  IconButton,
  Card,
  CardContent,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Facebook,
  Google,
  Instagram,
  CloudUpload,
  Add
} from '@mui/icons-material';
import Breadcrumb from '../components/ui/Breadcrumb/Breadcrumb';

// Styled components
const StyledContainer = styled(Container)(({ theme }) => ({
  width: '100%',
  padding: '0 100px',
  margin: '20px auto',
  [theme.breakpoints.down('md')]: {
    padding: '0 20px',
  },
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 'bold',
  maxWidth: '1000px',
  marginBottom: theme.spacing(2),
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  padding: '40px 120px',
  width: '100%',
  maxWidth: '1000px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '20px',
  },
}));

const SocialButton = styled(Button)(() => ({
  padding: '10px 20px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '14px',
  color: '#333',
  backgroundColor: '#fff',
  textTransform: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '200px',
  '&:hover': {
    border: '1px solid #333',
    transform: 'translateY(-1px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
  },
  '& .MuiButton-startIcon': {
    marginRight: '10px',
  },
}));

const UploadContainer = styled(Box)(() => ({
  marginBottom: '30px',
  display: 'flex',
  justifyContent: 'center',
}));

const UploadBox = styled(Paper)(() => ({
  border: '2px dashed #ddd',
  width: '100px',
  height: '100px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  backgroundColor: 'transparent',
  '&:hover': {
    borderColor: '#333',
  },
}));

const UploadText = styled(Typography)({
  fontSize: '12px',
  color: '#777',
  marginTop: '4px',
});

const FormSection = styled(Box)(() => ({
  marginBottom: '30px',
  width: '100%',
}));

const SectionTitle = styled(Typography)(() => ({
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '15px',
  textAlign: 'center',
}));

const StyledTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ddd',
    },
    '&:hover fieldset': {
      borderColor: '#333',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#333',
      boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.1)',
    },
  },
}));

const SubmitButton = styled(Button)(() => ({
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  padding: '12px 40px',
  borderRadius: '3px',
  fontSize: '16px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  margin: '0 auto',
  '&:hover': {
    backgroundColor: '#333',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
  },
  '&:disabled': {
    backgroundColor: '#ccc',
    transform: 'none',
    boxShadow: 'none',
  },
}));

const StyledDivider = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  margin: '30px 0',
  width: '100%',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: '1px',
    backgroundColor: '#ddd',
  },
  '& span': {
    background: '#fff',
    padding: '0 20px',
    color: '#666',
    fontSize: '14px',
    position: 'relative',
    zIndex: 1,
  },
}));

export default function Registration() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    street: '',
    area: '',
    emirate: '',
  });

  const [uploadedImage, setUploadedImage] = useState(null);

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Registration' }
  ];

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
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

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
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

          {/* Personal Information Form */}
          <FormSection>
            <SectionTitle>Personal Information</SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange('mobile')}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </FormSection>

          {/* Address Information Form */}
          <FormSection>
            <SectionTitle>Address Information</SectionTitle>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Street"
                  value={formData.street}
                  onChange={handleInputChange('street')}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Area"
                  value={formData.area}
                  onChange={handleInputChange('area')}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Emirate"
                  value={formData.emirate}
                  onChange={handleInputChange('emirate')}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </FormSection>

          {/* Submit Button */}
          <SubmitButton onClick={handleSubmit}>
            Register
          </SubmitButton>
        </ContentContainer>
      </StyledContainer>
    </>
  );
}