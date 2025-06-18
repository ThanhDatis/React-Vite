import React from 'react';
import { Link } from 'react-router-dom';
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
  Paper
} from '@mui/material';
import {
  Facebook,
  Twitter,
  YouTube,
  Send as SendIcon
} from '@mui/icons-material';

export default function FooterContent() {
  // Dữ liệu Footer
  const footerData = {
    mainPages: [
      { id: 1, title: "Sell with US" },
      { id: 2, title: "About US" },
      { id: 3, title: "Contact US" },
      { id: 4, title: "Promos" },
      { id: 5, title: "Become an Ambassador" },
    ],
    policy: [
      { id: 1, title: "Terms of Usage" },
      { id: 2, title: "Privacy Policy" },
      { id: 3, title: "Return Policy" },
    ],
    categories: [
      { id: 1, title: "Skincare", path: "/skincare" },
      { id: 2, title: "Makeup", path: "/makeup" },
      { id: 3, title: "Hair Care", path: "/haircare" },
      { id: 4, title: "Bath & Body", path: "/bath-body" },
      { id: 5, title: "Beauty Supplements", path: "/fragrance" },
    ],
    socialIcons: [
      {
        id: 1,
        name: "Facebook",
        icon: <Facebook />,
        color: "#1877f2"
      },
      {
        id: 2,
        name: "Twitter", 
        icon: <Twitter />,
        color: "#1da1f2"
      },
      {
        id: 3,
        name: "YouTube",
        icon: <YouTube />,
        color: "#ff0000"
      }
    ]
  };

  // Component tái sử dụng cho danh sách footer
  const FooterList = ({ title, items }) => (
    <Box>
      <Typography 
        variant="h6" 
        component="h3" 
        sx={{ 
          fontWeight: 'bold',
          mb: 2,
          textTransform: 'uppercase',
          fontSize: '16px',
          color: '#333333'
        }}
      >
        {title}
      </Typography>
      <List sx={{ p: 0 }}>
        {items.map((item) => (
          <ListItem key={item.id} sx={{ p: 0, mb: 1 }}>
            <ListItemText>
              <Typography
                component={Link}
                to={
                  title === "categories" 
                    ? item.path || `/category/${item.title.toLowerCase().replace(/\s+/g, '-')}`
                    : `/${item.title.toLowerCase().replace(/\s+/g, '-')}`
                }
                sx={{
                  color: '#666666',
                  textDecoration: 'none',
                  fontSize: '14px',
                  '&:hover': {
                    color: '#333333',
                    textDecoration: 'underline'
                  }
                }}
              >
                {item.title}
              </Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Component tái sử dụng cho social icons
  const SocialIcons = ({ icons }) => (
    <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
      {icons.map(icon => (
        <IconButton
          key={icon.id}
          href="#"
          aria-label={icon.name}
          sx={{
            backgroundColor: icon.color,
            color: 'white',
            width: 30,
            height: 30,
            '&:hover': {
              backgroundColor: icon.color,
              opacity: 0.8,
              transform: 'scale(1.1)'
            }
          }}
        >
          {icon.icon}
        </IconButton>
      ))}
    </Box>
  );

  return (
    <Box component="footer" sx={{ backgroundColor: '#E8E8E8', pt: 6, pb: 2 }}>
      <Container maxWidth="lg" 
      sx={{ px: 2, }}>
        <Grid container spacing={1.5}>
          {/* Logo và Social Icons */}
          <Grid item xs={12} sm={6} md={3}>
            <Box>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ fontWeight: "bold", mb: 2, color: "#333333" }}
              >
                YOUR LOGO
              </Typography>
              <SocialIcons icons={footerData.socialIcons} />
            </Box>
          </Grid>

          {/* Main Pages */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterList title="main pages" items={footerData.mainPages} />
          </Grid>

          {/* Policy */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterList title="policy" items={footerData.policy} />
          </Grid>

          {/* Categories */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterList title="categories" items={footerData.categories} />
          </Grid>

          {/* Newsletter Subscription */}
          <Grid item xs={12} sm={12} md={3}>
            <Box>
              <Typography 
                variant="h6" 
                component="h3" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                  textTransform: 'uppercase',
                  fontSize: '16px',
                  color: '#333333'
                }}
              >
                Subscribe
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  mb: 2,
                  color: '#666666',
                  lineHeight: 1.6,
                  fontSize: '13px'
                }}
              >
                Subscribe to our newsletter, so that you can be the first to know about new offers and promotions.
              </Typography>
              <Box 
                component="form" 
                sx={{ 
                  display: 'flex',
                  flexDirection: {xs: 'column', md: 'row'},
                  gap: 1.5
                }}
              >
                <TextField
                  type="email"
                  placeholder="Enter email address"
                  variant="outlined"
                  size="small"
                  fullWidth
                  sx={{
                    width: '50%',
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      fontSize: '14px'
                    }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon sx={{ fontSize: '16px' }} />}
                  sx={{
                    maxWidth: '150px',
                    backgroundColor: 'ActiveBorder',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    '&:hover': {
                      backgroundColor: '#555555'
                    }
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4 }} />

        {/* Footer Bottom */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="body2" sx={{ color: '#666666' }}>
            © 2025 Your Company. All rights reserved.
          </Typography>
          
          {/* Payment Icons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {/* Mastercard Icon */}
            <Paper 
              elevation={1}
              sx={{ 
                p: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 45,
                height: 30,
                borderRadius: 1,
                backgroundColor: '#fff'
              }}
            >
              <Box
                component="svg"
                width="35"
                height="22"
                viewBox="0 0 35 22"
                sx={{ display: 'block' }}
              >
                <circle cx="13" cy="11" r="8" fill="#EB001B"/>
                <circle cx="22" cy="11" r="8" fill="#F79E1B"/>
                <path
                  d="M17.5 5c2 1.9 3.2 4.5 3.2 7.5s-1.2 5.6-3.2 7.5c-2-1.9-3.2-4.5-3.2-7.5S15.5 6.9 17.5 5z"
                  fill="#FF5F00"
                />
              </Box>
            </Paper>

            {/* Visa Icon */}
            <Paper 
              elevation={1}
              sx={{ 
                p: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 45,
                height: 30,
                borderRadius: 1,
                backgroundColor: '#fff'
              }}
            >
              <Box
                component="svg"
                width="32"
                height="20"
                viewBox="0 0 32 20"
                sx={{ display: 'block' }}
              >
                <path
                  d="M14.5 8.5L12 16h-2.5l-1.5-5.8c-.1-.4-.2-.5-.5-.7-.8-.4-1.8-.7-2.5-.9V8h4c.5 0 .9.4 1 .9l1 4.8L13.5 8h2.5l-1.5.5zm3 7.5h-2.3l1.5-7.5h2.3l-1.5 7.5zm8.2-5c0-.3-.2-.5-.5-.5h-2v1.5h2c.3 0 .5-.2.5-.5v-.5zm.8 5h-2l.2-1c-.5.7-1.2 1.2-2.2 1.2-1.2 0-2-.8-2-2 0-1.8 1.3-2.8 3.5-2.8h1v-.2c0-.5-.3-.7-1.2-.7-.8 0-1.5.2-2 .5l.3-1.5c.8-.2 1.5-.4 2.2-.4 1.7 0 2.5.7 2.5 2.2l-.3 4.7z"
                  fill="#1A1F71"
                />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
