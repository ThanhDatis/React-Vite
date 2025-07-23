import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, styled } from '@mui/material';

const StyledLogo = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  textDecoration: 'none',
  color: 'inherit',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    transform: 'scale(1.05)',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  
  [theme.breakpoints.down('md')]: {
    fontSize: '16px',
  },
}));

// ==================== LOGO COMPONENT ====================
/**
 * Logo Component - Reusable logo for header
 * @param {string} text - Logo text content
 * @param {string} to - Navigation path
 * @param {object} sx - Additional styles
 * @param {string} variant - Typography variant
 * @param {boolean} responsive - Whether to apply responsive styling
 */
export const Logo = React.memo(({ 
  text = "YOUR LOGO",
  to = "/",
  sx = {},
  variant = "h6",
  responsive = true,
  ...props
}) => {
  const responsiveStyles = responsive ? {
    fontSize: { xs: '16px', md: '20px' },
    paddingRight: { md: '70px' },
    paddingLeft: { md: '70px' },
    flexGrow: { xs: 1, md: 0 },
  } : {};

  return (
    <StyledLogo
      variant={variant}
      noWrap
      component={Link}
      to={to}
      sx={{
        ...responsiveStyles,
        ...sx
      }}
      {...props}
    >
      {text}
    </StyledLogo>
  );
});

Logo.displayName = 'Logo';

// ==================== LOGO WITH IMAGE ====================
/**
 * LogoWithImage Component - Logo with image support
 * @param {string} src - Image source
 * @param {string} alt - Image alt text
 * @param {string} text - Fallback text if image fails
 * @param {string} to - Navigation path
 * @param {object} sx - Additional styles
 * @param {number} height - Logo height
 */
export const LogoWithImage = React.memo(({ 
  src,
  alt = "Logo",
  text = "YOUR LOGO",
  to = "/",
  sx = {},
  height = 40,
  responsive = true,
  ...props
}) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = React.useCallback(() => {
    setImageError(true);
  }, []);

  const responsiveStyles = responsive ? {
    paddingRight: { md: '70px' },
    paddingLeft: { md: '70px' },
    flexGrow: { xs: 1, md: 0 },
  } : {};

  if (!src || imageError) {
    return (
      <Logo 
        text={text} 
        to={to} 
        sx={sx} 
        responsive={responsive}
        {...props}
      />
    );
  }

  return (
    <StyledLogo
      component={Link}
      to={to}
      sx={{
        display: 'flex',
        alignItems: 'center',
        ...responsiveStyles,
        ...sx
      }}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        onError={handleImageError}
        style={{
          height: height,
          width: 'auto',
          objectFit: 'contain',
        }}
      />
    </StyledLogo>
  );
});

LogoWithImage.displayName = 'LogoWithImage';

export default Logo;