import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
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

import { FOOTER_DATA, COMPANY_INFO } from "../../../data/footerData";
import { useNewsletter } from "../../../hooks/useNewsletter";

const FooterList = React.memo(({ title, items }) => (
  <Box>
    <Typography
      variant="h6"
      component="h3"
      sx={{
        fontWeight: "bold",
        mb: { xs: 1.5, md: 2 },
        textTransform: "uppercase",
        fontSize: { xs: "14px", md: "16px" },
        color: "text.primary",
        letterSpacing: 0.5,
      }}
    >
      {title}
    </Typography>
    <List sx={{ p: 0 }} role="list">
      {items.map((item) => (
        <ListItem key={item.id} sx={{ p: 0, mb: 0.5 }} role="listitem">
          <ListItemText>
            <Typography
              component={Link}
              to={item.path}
              sx={{
                color: 'text.secondary',
                textDecoration: 'none',
                fontSize: { xs: '13px', md: '14px' },
                display: 'block',
                py: 0.5,
                transition: "all 0.2s ease-in-out",
                '&:hover': {
                  color: "text.primary",
                  textDecoration: "underline",
                  pl: 0.5,
                },
                '&:focus': {
                  outline: '2px solid',
                  outlineColor: 'primary.main',
                  outlineOffset: '2px',
                  borderRadius: 1,
                },
              }}
            >
              {item.title}
            </Typography>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  </Box>
));

// Component tái sử  cho social icons
const SocialIcons = React.memo(({ socialLinks }) => {

  const renderIcon = (iconType) => {
    // const normalizedType = iconType?.toLowerCase().trim();

    switch (iconType) {
      case "facebook":
        return <Facebook />;
      case "twitter":
        return <Twitter />;
      case "youtube":
        return <YouTube />;
      default:
        // console.warn(`Unknown social icon type:, "${iconType}"`);
        return null;
    }
  };

  return (
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }} role="list">
        {socialLinks.map(social => (
          <IconButton
            key={social.id}
            component="a"
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit our ${social.name} page`}
            sx={{
              backgroundColor: social.color,
              color: 'white',
              width: { xs: 36, md: 40 },
              height: { xs: 36, md: 40 },
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: social.color,
                opacity: 0.8,
                transform: "scale(1.1)",
              },
              '&:focus': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: '2px',
              },
            }}
          >
            {renderIcon(social.iconType)}
          </IconButton>
        ))}
      </Box>
    );
  });

const NewsletterSubscription = () => {
  const {
    email,
    isLoading,
    message,
    handleEmailChange,
    handleSubmit,
    isSubmitDisabled
  } = useNewsletter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Box>
      <Typography
        variant="h6"
        component="h3"
        sx={{
          fontWeight: "bold",
          mb: { xs: 1.5, md: 2 },
          textTransform: "uppercase",
          fontSize: { xs: "14px", md: "16px" },
          color: 'text.primary',
          letterSpacing: 0.5,
        }}
      >
        Subscribe to Newsletter
      </Typography>
      
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: 'text.secondary',
          lineHeight: 1.6,
          fontSize: { xs: "12px", md: "14px" },
        }}
      >
        Be the first to know about new offers and promotions
      </Typography>
  
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
        <TextField
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
          variant="outlined"
          size="small"
          fullWidth={isMobile}
          disabled={isLoading}
          inputProps={{
            'aria-label': 'Email address for newsletter subscription',
            'aria-describedby': message.text ? 'subscription-message' : undefined,
          }}
          sx={{
            flex: 1,
            maxWidth: { md: '200px' },
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper',
              fontSize: '14px',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
              },
            }
          }}
        />
        
        <Button
          type="submit"
          variant="contained"
          disabled={isSubmitDisabled}
          startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <EmailIcon />}
          sx={{
            minWidth: { xs: '100%', md: '140px' },
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            fontWeight: 'bold',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            '&:disabled': {
              backgroundColor: 'action.disabledBackground'
            }
          }}
        >
          {isLoading ? 'Loading...' : 'Subscribe'}
        </Button>
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

const PaymentIcons = React.memo(() => (
  <Box sx={{ display: 'flex', gap: 1 }} role="img" aria-label="Accepted payment methods">
    {/* Mastercard */}
    <Paper
      elevation={1}
      sx={{
        p: 0.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: 40, md: 45 },
        height: { xs: 25, md: 30 },
        borderRadius: 1,
        backgroundColor: 'background.paper'
      }}
    >
      <Box
        component="svg"
        width="30"
        height="18"
        viewBox="0 0 35 22"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Mastercard"
      >
        <circle cx="10" cy="16" r="9" fill="#EB001B"/>
        <circle cx="22" cy="16" r="9" fill="#F79E1B"/>
        <path d="M16 22.7083C17.8413 21.0603 19 18.6655 19 16C19 13.3345 17.8413 10.9397 16 9.29175C14.1587 10.9397 13 13.3345 13 16C13 18.6655 14.1587 21.0603 16 22.7083Z" fill="#FC6020"/>

      </Box>
    </Paper>

    {/* Visa */}
    <Paper
      elevation={1}
      sx={{
        p: 0.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: 40, md: 45 },
        height: { xs: 25, md: 30 },
        borderRadius: 1,
        backgroundColor: 'background.paper'
      }}
    >
      <Box
        component="svg"
        width="28"
        height="16"
        viewBox="0 0 32 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Visa"
      >
        <path
          d="M14.5 8.5L12 16h-2.5l-1.5-5.8c-.1-.4-.2-.5-.5-.7-.8-.4-1.8-.7-2.5-.9V8h4c.5 0 .9.4 1 .9l1 4.8L13.5 8h2.5l-1.5.5zm3 7.5h-2.3l1.5-7.5h2.3l-1.5 7.5zm8.2-5c0-.3-.2-.5-.5-.5h-2v1.5h2c.3 0 .5-.2.5-.5v-.5zm.8 5h-2l.2-1c-.5.7-1.2 1.2-2.2 1.2-1.2 0-2-.8-2-2 0-1.8 1.3-2.8 3.5-2.8h1v-.2c0-.5-.3-.7-1.2-.7-.8 0-1.5.2-2 .5l.3-1.5c.8-.2 1.5-.4 2.2-.4 1.7 0 2.5.7 2.5 2.2l-.3 4.7z"
          fill="#1A1F71"
        />
      </Box>
    </Paper>
  </Box>
));

export default function FooterContent() {
  // const Theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.100',
        pt: { xs: 4, md: 6 },
        pb: 2,
        mt: 'auto',
      }}
      role="contentinfo"
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography
                variant="h5"
                component="div"
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
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '11px', md: '12px' },
            }}
          >
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </Typography>

          <PaymentIcons 
            types={['mastercard', 'visa']}
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
PaymentIcons.displayName = 'PaymentIcons';