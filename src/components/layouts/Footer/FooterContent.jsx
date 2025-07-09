import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  // TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { 
  Email as EmailIcon,
  Facebook,
  Twitter,
  YouTube
} from "@mui/icons-material";

import { 
  SubscribeButton,
  SocialButton,
  HeadingTypography,
  LinkTypography,
  BodyTypography,
  PaymentIconGroup,
  ValidatedTextField,
} from "../../common";

import { FOOTER_DATA, COMPANY_INFO, NEWSLETTER_MESSAGES } from "../../../data/footerData";
import { useNewsletter } from "../../../hooks/useNewsletter";

const FooterList = React.memo(({ title, items }) => (
  <Box>
    <HeadingTypography variant="h6" component="h3">
      {title}
    </HeadingTypography>
    <List sx={{ p: 0 }} role="list">
      {items.map((item) => (
        <ListItem key={item.id} sx={{ p: 0, mb: 0.5 }} role="listitem">
          <ListItemText>
            <LinkTypography to={item.path}>
              {item.title}
            </LinkTypography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  </Box>
));

// Component tái sử  cho social icons
const SocialIcons = React.memo(({ socialLinks }) => {

  const renderIcon = (iconType) => {
    
    switch (iconType) {
      case "facebook":
        return <Facebook />;
      case "twitter":
        return <Twitter />;
      case "youtube":
        return <YouTube />;
      default:
        return null;
    }
  };

  return (
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }} role="list">
        {socialLinks.map(social => (
          <SocialButton
            key={social.id}
            component="a"
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit our ${social.name} page`}
            bgColor={social.color}
          >
            {renderIcon(social.iconType)}
          </SocialButton>
        ))}
      </Box>
    );
  });

const NewsletterSubscription = () => {
  const {
    email,
    emailError,
    showEmailError,
    isLoading,
    message,
    handleEmailChange,
    handleEmailBlur,
    handleEmailFocus,
    handleSubmit,
    isSubmitDisabled
  } = useNewsletter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Box>
      <HeadingTypography variant="h6" component="h3">
        Subscribe to Newsletter
      </HeadingTypography>
      
      <BodyTypography sx={{ mb: 2}}>
        Be the first to know about new offers and promotions
      </BodyTypography>
  
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 1, md: 1.5 },
          mt: message.text ? 1 : 0,
        }}
        noValidate
      >
        <ValidatedTextField
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          onFocus={handleEmailFocus}
          error={emailError}
          showError={showEmailError}
          variant="outlined"
          size="small"
          fullWidth={isMobile}
          disabled={isLoading}
          tooltipPlacement="top"
          inputProps={{
            'aria-label': 'Email address for newsletter subscription',
          }}
          sx={{
            flex: 1,
            minWidth: '280px',
          }}
        />
        
        <SubscribeButton
          type="submit"
          variant="contained"
          disabled={isSubmitDisabled}
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <EmailIcon />}
        >
          {isLoading ? 'Loading...' : 'Subscribe'}
        </SubscribeButton>
      </Box>
  
      {message.text && (
        <Alert
          severity={message.type}
          id="subscription-message"
          sx={{
            mt: 1,
            fontSize: '12px',
            '& .MuiAlert-message': {
              fontSize: 'inherit',
            }
          }}
        >
          {message.text}
        </Alert>
      )}
    </Box>
  );
};

export default function FooterContent() {
  // const Theme = useTheme();
  return (
    <Box component="footer"
      sx={{ backgroundColor: 'grey.100', pt: { xs: 4, md: 6 }, pb: 2, mt: 'auto', }}
      role="contentinfo"
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography variant="h5" component="div"
                sx={{ 
                  fontWeight: 700,
                  mb: 2,
                  textTransform: 'uppercase',
                  color: 'text.primary',
                  fontSize: { xs: '16px', md: '18px' }
                }}
              >
                {COMPANY_INFO.logo}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mb: 1,
                  fontSize: { xs: '12px', md: '13px' }
                }}
              >
                {COMPANY_INFO.tagLine}
              </Typography>
              <SocialIcons socialLinks={ FOOTER_DATA.socialLinks } />
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FooterList title="Company" items={FOOTER_DATA.mainPages} />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FooterList title="Legal" items={ FOOTER_DATA.policy } />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FooterList title="Categories" items={ FOOTER_DATA.categories } />
          </Grid>

          <Grid item xs={12} md={3}>
            <NewsletterSubscription />
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 3, md: 4 } }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            textAlign: { xs: 'center', sm: 'left' },
        }}>
          <BodyTypography variant="caption">
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </BodyTypography>

          <PaymentIconGroup 
            types={['mastercard', 'paypal']}
            size='medium'
            containerSx={{ justifyContent: { xs: 'center', sm: 'flex-end' } }}
          />
        </Box>
      </Container>
    </Box>
  );
}

FooterList.displayName = 'FooterList';
SocialIcons.displayName = 'SocialIcons';