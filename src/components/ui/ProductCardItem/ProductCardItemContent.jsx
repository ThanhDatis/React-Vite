import React , { memo, useCallback, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
  Fade,
  Skeleton,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  border: '1px solid #eee',
  borderRadius: 0,
  boxShadow: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    '& .product-image': {
      transform: 'scale(1.05)',
    },
    '& .product-actions': {
      opacity: 1,
    }
  }
}));

const StyledCardMedia = styled(CardMedia)({
  aspectRatio: '1/1',
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '& img': {
    transition: 'transform 0.3s ease',
  }
});

const ImageSkeleton = styled(Skeleton)({
  aspectRatio: '1/1',
  transform: 'none',
});

const ImageContainer = styled(Box)({
  position: 'relative',
  aspectRatio: '1/1',
  overflow: 'hidden',
});

const CategoryChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  left: 10,
  backgroundColor: '#000',
  color: '#fff',
  fontSize: '12px',
  fontWeight: 'bold',
  height: 'auto',
  padding: '4px 8px',
  zIndex: 2,
  '& .MuiChip-label': {
    padding: 0,
  }
}));

const ProductActions = styled(Box)({
  position: 'absolute',
  top: 10,
  right: 10,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  opacity: 0,
  transition: 'opacity 0.3s ease',
  zIndex: 2,
});

const ActionButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: '#fff',
  width: 32,
  height: 32,
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s ease',
  '&:hover': {
    backgroundColor: '#fff',
    transform: 'scale(1.1)',
  }
}));

const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  display: 'block',
});

const PriceContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  marginTop: 8,
});

const OldPrice = styled(Typography)({
  fontSize: '14px',
  color: '#999',
  textDecoration: 'line-through',
});

const NewPrice = styled(Typography)({
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#333',
});

const Discount = styled(Typography)({
  fontSize: '14px',
  color: '#ff3333',
  fontWeight: 'bold',
});

const ProductCardItem = memo (({ 
  product,
  showCategory = false,
  onWishlistClick,
  onCartClick,
  imageSizes = "300px" ,
  showFeedback = true,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoaded(false);
  }, []);

  const showSnackbar = useCallback(( message, severity = 'success') => {
    if (showFeedback) {
      setSnackbar({
        open: true,
        message,
        severity,
      });
    }
  }, [showFeedback]);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar(prev => ({ ...prev, open: false }));
  }, []);

  const handleWishlistClick = useCallback(async(e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (onWishlistClick) {
        await onWishlistClick(product);
        showSnackbar(`${product.title} added to wishlist`);
      } else {
        console.log('Added to wishlist:', product.id);
        showSnackbar(`${product.title} added to wishlist`);
      }
    } catch (error) {
      showSnackbar(`Failed to add to wishlist`, 'error');
    }
  }, [product, onWishlistClick, showSnackbar]);

  const handleCartClick = useCallback( async(e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (onCartClick) {
        await onCartClick(product);
        showSnackbar(`${product.title} added to cart`);
      } else {
        console.log('Added to cart:', product.id);
        showSnackbar(`${product.title} added to cart`);
      }
    } catch (error) {
      showSnackbar(`Failed to add to cart`, 'error');
    }
  }, [product, onCartClick, showSnackbar]);

  const getImageProps = () => {
    const baseProps = {
      alt: product.title,
      loading: 'lazy',
      className: 'product-image',
      onLoad: handleImageLoad,
      onError: handleImageError,
    };

    if (product.images && Array.isArray(product.images)) {
      return {
        ...baseProps,
        src: product.images[0]?.url || product.image,
        srcSet: product.images
        .map((img) => `${img.url} ${imageSizes}w`)
        .join(','),
        sizes: imageSizes,
      };
    }

    return { ...baseProps, src: product.image };
  };

  return (
    <StyledCard>
      <StyledLink to={`/product/${product.id}`}>
        <Box position="relative">
          <StyledCardMedia component="img" {...getImageProps()} />
          
          {showCategory && product.category && (
            <CategoryChip label={product.category} size="small" />
          )}
          
          <ProductActions className="product-actions">
            <Fade in timeout={300}>
              <ActionButton onClick={handleWishlistClick}
                size="small"
                aria-label="Add to wishlist"
              >
                <FavoriteBorderIcon fontSize="small" />
              </ActionButton>
            </Fade>
            <Fade in timeout={300}>
              <ActionButton onClick={handleCartClick} size="small" aria-label="Add to cart" >
                <ShoppingCartOutlinedIcon fontSize="small" />
              </ActionButton>
            </Fade>
          </ProductActions>
        </Box>
      </StyledLink>

      <StyledLink to={`/product/${product.id}`}>
        <CardContent sx={{ flexGrow: 1, padding: '15px' }}>
          <Typography variant="h6" component="h2"
            sx={{
              fontSize: '16px',
              fontWeight: 'bold',
              marginBottom: '5px',
              lineHeight: 1.2
            }}
          >
            {product.title}
          </Typography>
          
          <Typography variant="body2"
            sx={{
              color: '#666',
              textTransform: 'uppercase',
              fontSize: '14px',
              marginBottom: '10px'
            }}
          >
            {product.brand}
          </Typography>
          
          <PriceContainer>
            {product.oldPrice && (
              <OldPrice variant="body2">
                {product.oldPrice}
              </OldPrice>
            )}
            <NewPrice variant="body2"> {product.newPrice} </NewPrice>
            {product.discount && ( <Discount variant="body2"> {product.discount} </Discount> )}
          </PriceContainer>
        </CardContent>
      </StyledLink>
    </StyledCard>
  );
});

ProductCardItem.displayName = 'ProductCardItem';

export default ProductCardItem;