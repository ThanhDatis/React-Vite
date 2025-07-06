import React, { useState, useCallback, isValidElement } from "react";
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
  Facebook,
  Twitter,
  YouTube,
  Send as SendIcon,
  Email as EmailIcon,
} from "@mui/icons-material";
// import { useTheme } from "@emotion/react";

const FOOTER_DATA = {
  mainPages: [
    { id: 1, title: "Sell with US", path: "/sell" },
    { id: 2, title: "About US", path: "/about" },
    { id: 3, title: "Contact US", path: "/contact" },
    { id: 4, title: "Promos", path: "/promos" },
    { id: 5, title: "Become an Ambassador", path: "/ambassador" },
  ],
  policy: [
    { id: 1, title: "Terms of Usage", path: "/terms" },
    { id: 2, title: "Privacy Policy", path: "/privacy" },
    { id: 3, title: "Return Policy", path: "/returns" },
  ],
  categories: [
    { id: 1, title: "Skincare", path: "/skincare" },
    { id: 2, title: "Makeup", path: "/makeup" },
    { id: 3, title: "Hair Care", path: "/haircare" },
    { id: 4, title: "Bath & Body", path: "/bath-body" },
    { id: 5, title: "Beauty Supplements", path: "/fragrance" },
  ],
  socialLinks: [
    {
      id: 1,
      name: "Facebook",
      icon: <Facebook />,
      href: "https://www.facebook.com",
      color: "#1877F2",
    },
    {
      id: 2,
      name: "Twitter",
      icon: <Twitter />,
      href: "https://www.twitter.com",
      color: "#1DA1F2",
    },
    {
      id: 3,
      name: "YouTube",
      icon: <YouTube />,
      href: "https://www.youtube.com",
      color: "#FF0000",
    },
  ],
};

const IsValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
};

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
                color: "text.secondary",
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
const SocialIcons = React.memo(({ socialLinks }) => (
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
        {social.icon}
      </IconButton>
    ))}
  </Box>
));

const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleEmailChange = useCallback((event) => {
    setEmail(event.target.value);
    if (message.text) setMessage({ text: '', type: '' });
  }, [message.text]);

  const handleSubmit = useCallback( async (event) => {
    event.preventDefault();

    const  trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setMessage({ 
        text: "Please enter your email address.", 
        type: "error" 
      });
      return;
    }

    if (!isValidElement(trimmedEmail)) {
      setMessage({ 
        text: "Invalid email address format.", 
        type: "error" 
      });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Giả lập gửi email
      await new Promise(resolve => setTimeout(resolve, 1000));

      setMessage({ 
        text: "Subscription successful!", 
        type: "success" });
      setEmail('');
    } catch {
      setMessage({
        text: "Failed to subscribe. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [email]);
  
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
        Subscribe to our Newsletter
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
          // component="button"
          type="submit"
          variant="contained"
          disabled={isLoading || !email.trim() || !IsValidEmail(email.trim())}
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
  <Box
    sx={{ display : 'flex', gap: 1 }} role="img" aria-label="Payment icons"
  >
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
        backgroundColor: 'background.paper',
      }}
    >
      <Box
        component="svg"
        width="30"
        height="18"
        viewBox="0 0 35 22"
        aria-label="Mastercard"
      >
        <circle cx="13" cy="11" r="8" fill="#EB001B"/>
        <circle cx="22" cy="11" r="8" fill="#F79E1B"/>
        <path
          d="M17.5 5c2 1.9 3.2 4.5 3.2 7.5s-1.2 5.6-3.2 7.5c-2-1.9-3.2-4.5-3.2-7.5S15.5 6.9 17.5 5z"
          fill="#FF5F00"
        />
      </Box>
    </Paper>

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
  const Theme = useTheme();

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
                Your logo
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  mb: 1,
                  fontSize: { xs: '12px', md: '13px' }
                }}
              >
                Your trusted beauty destination
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
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </Typography>

          <PaymentIcons />
        </Box>
      </Container>
    </Box>
  );
}

FooterList.displayName = 'FooterList';
SocialIcons.displayName = 'SocialIcons';
PaymentIcons.displayName = 'PaymentIcons';