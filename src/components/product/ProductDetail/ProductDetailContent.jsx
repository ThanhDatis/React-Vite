import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  IconButton,
  TextField,
  Chip,
  Card,
  CardMedia,
  CardContent,
  Tab,
  Tabs,
  Rating,
  Stack,
  Divider,
  Paper,
  ButtonGroup,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Add,
  Remove,
  ShoppingCart,
  Star
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { categories } from '../../../data/productData';
import Breadcrumb from '../../ui/Breadcrumb/Breadcrumb';
import { useCart } from '../../../hooks/useCart';

// Styled Components
const MainImage = styled(Box)(({ theme }) => ({
  width: '100%',
  aspectRatio: '1',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  marginBottom: theme.spacing(1.25),
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}));

const ThumbnailContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1.25),
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    height: 6,
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: 3,
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: 3,
  }
}));

const ThumbnailBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active'
})(({ theme, active }) => ({
  width: 80,
  height: 80,
  borderRadius: theme.spacing(0.5),
  overflow: 'hidden',
  cursor: 'pointer',
  border: `2px solid ${active ? theme.palette.primary.main : 'transparent'}`,
  transition: 'border-color 0.2s ease',
  flexShrink: 0,
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}));

const SizeButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'selected'
})(({ theme, selected }) => ({
  minWidth: 48,
  height: 48,
  borderRadius: theme.spacing(0.5),
  border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.grey[300]}`,
  backgroundColor: selected ? theme.palette.primary.light : 'white',
  color: selected ? theme.palette.primary.main : theme.palette.text.primary,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    backgroundColor: selected ? theme.palette.primary.light : theme.palette.primary.lighter || '#f0f7ff'
  }
}));

const PriceContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3)
}));

const SalePrice = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 600,
  color: theme.palette.error.main
}));

const OriginalPrice = styled(Typography)(({ theme }) => ({
  textDecoration: 'line-through',
  color: theme.palette.text.secondary
}));

const QuantityButton = styled(IconButton)(({ theme }) => ({
  width: 36,
  height: 36,
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: theme.palette.grey[100]
  }
}));

const RelatedProductCard = styled(Card)(({ theme }) => ({
  background: '#fff',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
  }
}));

const ProductImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  aspectRatio: '1',
  overflow: 'hidden',
  '& .cart-btn': {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    transform: 'translateX(-50%)',
    opacity: 0,
    transition: 'opacity 0.3s ease'
  },
  '&:hover .cart-btn': {
    opacity: 1
  }
});

const ProductDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  // Sample review data
  const reviews = [
    {
      id: 1,
      user: "Nguyễn Văn A",
      rating: 5,
      date: "2024-03-15",
      comment: "Sản phẩm rất tốt, đúng như mô tả. Giao hàng nhanh!",
    },
    {
      id: 2,
      user: "Trần Thị B",
      rating: 4,
      date: "2024-03-14",
      comment: "Chất lượng tốt, đóng gói cẩn thận. Sẽ ủng hộ shop lần sau.",
    }
  ];

  useEffect(() => {
    const findProductAndCategory = () => {
      for (const cat of categories) {
        const found = cat.products.find(p => p.id === id);
        if (found) {
          setProduct({
            ...found,
            sizes: ["36", "37", "38", "39", "40", "41"],
            images: [found.image, found.image, found.image, found.image],
            description: "Đây là phần mô tả chi tiết về sản phẩm. Bao gồm các thông tin về chất liệu, xuất xứ, hướng dẫn sử dụng và bảo quản.",
            features: [
              "Chất liệu cao cấp",
              "Thiết kế hiện đại",
              "Đế cao su bền bỉ",
              "Phù hợp nhiều phong cách"
            ]
          });
          setCategory(cat);

          const related = cat.products
            .filter(p => p.id !== id)
            .slice(0, 4);
          setRelatedProducts(related);
          return;
        }
      }
    };

    findProductAndCategory();
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === 'decrease') {
      setQuantity(prev => prev > 1 ? prev - 1 : 1);
    } else {
      setQuantity(prev => prev + 1);
    }
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      const productToAdd = {
        id: product.id,
        title: product.title,
        price: product.oldPrice || "0",
        salePrice: product.newPrice || "0",
        image: product.images[0],
        size: selectedSize,
        quantity: quantity
      };
      addToCart(productToAdd);
      alert('Sản phẩm đã được thêm vào giỏ hàng!');
    } else {
      alert('Vui lòng chọn size');
    }
  };

  const handleQuickAddToCart = (productId) => {
    const productToAdd = relatedProducts.find(p => p.id === productId);
    if (productToAdd) {
      const cartProduct = {
        id: productToAdd.id,
        title: productToAdd.title,
        price: productToAdd.oldPrice || "0",
        salePrice: productToAdd.newPrice || "0",
        image: productToAdd.image,
        size: productToAdd.sizes ? productToAdd.sizes[0] : "Default",
        quantity: 1
      };
      addToCart(cartProduct);
      alert('Sản phẩm đã được thêm vào giỏ hàng!');
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Vui lòng chọn size');
      return;
    }
    console.log('Mua ngay:', {
      productId: id,
      size: selectedSize,
      quantity: quantity
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  if (!product || !category) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight={400}
      >
        <CircularProgress />
        <Typography ml={2} color="text.secondary">
          Đang tải...
        </Typography>
      </Box>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: category.name, path: `/${category.path}` },
    { label: product.title }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Main Product Section */}
        <Grid container spacing={5}>
          {/* Left section - Image gallery */}
          <Grid item xs={12} md={6}>
            <Box maxWidth={600}>
              <MainImage>
                <img src={product.images[selectedImage]} alt={product.title} />
              </MainImage>
              
              <ThumbnailContainer>
                {product.images.map((image, index) => (
                  <ThumbnailBox
                    key={index}
                    active={selectedImage === index}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image} alt={`${product.title} ${index + 1}`} />
                  </ThumbnailBox>
                ))}
              </ThumbnailContainer>
            </Box>
          </Grid>

          {/* Right section - Product info */}
          <Grid item xs={12} md={6}>
            <Box maxWidth={500}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.title}
              </Typography>
              
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {product.brand}
              </Typography>
              
              <PriceContainer>
                <SalePrice>{product.newPrice}</SalePrice>
                <OriginalPrice variant="body1">
                  {product.oldPrice}
                </OriginalPrice>
                {product.discount && (
                  <Chip 
                    label={product.discount} 
                    color="error" 
                    size="small"
                  />
                )}
              </PriceContainer>

              {/* Size Selection */}
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Size:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {product.sizes.map(size => (
                    <SizeButton
                      key={size}
                      selected={selectedSize === size}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </SizeButton>
                  ))}
                </Stack>
              </Box>

              {/* Quantity Selection */}
              <Box mb={3}>
                <Typography variant="h6" gutterBottom>
                  Số lượng:
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <QuantityButton
                    onClick={() => handleQuantityChange('decrease')}
                    disabled={quantity <= 1}
                  >
                    <Remove />
                  </QuantityButton>
                  
                  <TextField
                    size="small"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    type="number"
                    inputProps={{ min: 1, style: { textAlign: 'center', width: 60 } }}
                  />
                  
                  <QuantityButton
                    onClick={() => handleQuantityChange('increase')}
                  >
                    <Add />
                  </QuantityButton>
                </Stack>
              </Box>

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} mt={4}>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  sx={{ flex: 1 }}
                >
                  Add to Cart
                </Button>
                
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleBuyNow}
                  sx={{ flex: 1 }}
                >
                  Mua ngay
                </Button>
                
                <IconButton
                  onClick={() => setIsFavorite(!isFavorite)}
                  color={isFavorite ? 'error' : 'default'}
                  sx={{ 
                    border: 1, 
                    borderColor: 'grey.300',
                    width: 48,
                    height: 48
                  }}
                >
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Product Details Tabs */}
        <Box mt={6}>
          <Paper sx={{ width: '100%' }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant={isMobile ? "fullWidth" : "standard"}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Mô tả sản phẩm" />
              <Tab label={`Đánh giá (${reviews.length})`} />
            </Tabs>
            
            <Box p={3}>
              {activeTab === 0 && (
                <Box>
                  <Typography paragraph>
                    {product.description}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom mt={2}>
                    Đặc điểm nổi bật:
                  </Typography>
                  
                  <Box component="ul" pl={3}>
                    {product.features.map((feature, index) => (
                      <Typography key={index} component="li" paragraph>
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Box mb={4}>
                    <Typography variant="h6" gutterBottom>
                      Đánh giá từ khách hàng
                    </Typography>
                    
                    <Stack direction="row" alignItems="center" spacing={2} mt={1}>
                      <Rating value={4.5} precision={0.5} readOnly />
                      <Typography>
                        4.5/5 ({reviews.length} đánh giá)
                      </Typography>
                    </Stack>
                  </Box>
                  
                  <Stack spacing={3}>
                    {reviews.map(review => (
                      <Box key={review.id}>
                        <Stack 
                          direction="row" 
                          alignItems="center" 
                          spacing={2} 
                          mb={1}
                          flexWrap="wrap"
                        >
                          <Typography fontWeight="bold">
                            {review.user}
                          </Typography>
                          <Rating value={review.rating} size="small" readOnly />
                          <Typography variant="body2" color="text.secondary">
                            {review.date}
                          </Typography>
                        </Stack>
                        
                        <Typography color="text.primary" mb={2}>
                          {review.comment}
                        </Typography>
                        
                        <Divider />
                      </Box>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>

        {/* Related Products Section */}
        <Box mt={8}>
          <Typography variant="h5" fontWeight={600} mb={3} color="text.primary">
            Sản phẩm liên quan
          </Typography>
          
          <Grid container spacing={3}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={relatedProduct.id}>
                <RelatedProductCard>
                  <ProductImageContainer>
                    <CardMedia
                      component="img"
                      image={relatedProduct.image}
                      alt={relatedProduct.title}
                      sx={{ aspectRatio: '1', objectFit: 'cover' }}
                    />
                    <Button
                      className="cart-btn"
                      variant="contained"
                      size="small"
                      startIcon={<ShoppingCart />}
                      onClick={() => handleQuickAddToCart(relatedProduct.id)}
                    >
                      Add to Cart
                    </Button>
                  </ProductImageContainer>
                  
                  <CardContent 
                    component={Link} 
                    to={`/product/${relatedProduct.id}`}
                    sx={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <Box mb={1}>
                      <Typography variant="body1" fontWeight={500} gutterBottom>
                        {relatedProduct.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {relatedProduct.brand}
                      </Typography>
                    </Box>
                    
                    <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ textDecoration: 'line-through' }}
                      >
                        {relatedProduct.oldPrice}
                      </Typography>
                      <Typography variant="body1" fontWeight={600} color="error.main">
                        {relatedProduct.newPrice}
                      </Typography>
                      {relatedProduct.discount && (
                        <Typography variant="body2" color="error.main" fontWeight={500}>
                          {relatedProduct.discount}
                        </Typography>
                      )}
                    </Stack>
                  </CardContent>
                </RelatedProductCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default ProductDetail;