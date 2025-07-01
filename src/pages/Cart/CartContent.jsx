import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  IconButton,
  Paper,
  Divider,
  Container,
  Stack
} from '@mui/material';
import { Remove, Add, Delete } from '@mui/icons-material';
import Breadcrumb from '../../components/ui/Breadcrumb/Breadcrumb';
import { useCart } from '../../store/contexts/CartContext';


const CartContent = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');

  const deliveryCharge = 15.00;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryCharge;

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Cart' }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography variant="h3" component="h1" 
          sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', letterSpacing: 2, fontSize: '30px'}}
        >
          CART
        </Typography>
        
        {cartItems.length === 0 ? (
          <Paper elevation={2} sx={{ p: 6, textAlign: 'center', backgroundColor: '#f9f9f9'}} >
            <Typography variant="h4" sx={{ mb: 2, color: '#666' }}>
              Giỏ hàng của bạn đang trống
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: '#888' }}>
              Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
            </Typography>
            <Button component={Link} to="/" variant="contained" size="large"
              sx={{ backgroundColor: '#333', color: 'white', px: 4, py: 1.5, fontWeight: 'bold', fontSize: '16px',
                '&:hover': { backgroundColor: '#555'}
              }}
            >
              Continue Shopping
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {/* Left Column - Cart Items */}
            <Grid item xs={12} md={8} >
              <Stack spacing={3}>
                {cartItems.map((item, index) => (
                  <Card key={`${item.id}-${item.size}-${index}`} elevation={2}
                    sx={{ p: 2, '&:hover': { boxShadow: 4 } }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      {/* Product Image */}
                      <Grid item xs={12} sm={3}>
                        <Box component="img" src={item.image} alt={item.title}
                          sx={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 1 }}
                        />
                      </Grid>
                      
                      {/* Product Details */}
                      <Grid item xs={12} sm={6} md={8}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, lineHeight: 1.2 }} >
                          {item.title}
                        </Typography>
                        
                        {item.brand && (
                          <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }} >
                            Brand: {item.brand}
                          </Typography>
                        )}
                        
                        {item.size && (
                          <Typography variant="body2" sx={{ color: '#666', mb: 1 }} >
                            Size: {item.size}
                          </Typography>
                        )}
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                          <Typography variant="body1" sx={{ textDecoration: 'line-through', color: '#999' }} >
                            AED {item.price ? parseFloat(item.price).toFixed(2) : "0.00"}
                          </Typography>
                          <Typography variant="h6" sx={{ color: '#e74c3c', fontWeight: 'bold', fontSize: '16px', }} >
                            AED {item.salePrice ? parseFloat(item.salePrice).toFixed(2) : "0.00"}
                          </Typography>
                        </Box>
                        
                        {/* Quantity Controls */}
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          gap: 1,
                          border: '1px solid #ddd',
                          borderRadius: 1,
                          width: 'fit-content',
                          p: 0.5
                        }}>
                          <IconButton size="small" onClick={() => updateQuantity(item.id, item.size, -1)}
                            sx={{ minWidth: 26, height: 26 }}
                          >
                            <Remove fontSize="small" />
                          </IconButton>
                          
                          <TextField value={item.quantity} size="small"
                            InputProps={{ readOnly: true,
                              sx: { width: 40, textAlign: 'center', '& input': { textAlign: 'center', p: 0, } }
                            }}
                          />
                          
                          <IconButton size="small" onClick={() => updateQuantity(item.id, item.size, 1)}
                            sx={{ minWidth: 26, height: 26, }}
                          >
                            <Add fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>
                      
                      {/* Remove Button */}
                      <Grid item xs={12} sm={3}>
                        <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                          <Button
                            variant="outlined" color="error" startIcon={<Delete />}
                            onClick={() => removeFromCart(item.id, item.size)}
                            sx={{ borderColor: '#e74c3c', color: '#e74c3c', fontWeight: 'bold', fontSize: '14px',
                              '&:hover': { backgroundColor: '#e74c3c', color: 'white' }
                            }}
                          >
                            REMOVE
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                ))}
              </Stack>
            </Grid>

            {/* Right Column - Summary */}
            <Grid item xs={12} md={4}>
              <Stack spacing={3}>
                {/* Promo Code Section */}
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }} >
                      Add Promo Code
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <TextField fullWidth size="small" value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter promo code"
                      />
                      <Button variant="contained"
                        sx={{ backgroundColor: '#333', minWidth: 80, fontWeight: 'bold',
                          '&:hover': { backgroundColor: '#555' }
                        }}
                      >
                        ADD
                      </Button>
                    </Box>
                  </CardContent>
                </Card>

                {/* Summary Section */}
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }} >
                      Summary
                    </Typography>
                    
                    <Stack spacing={1.5}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" sx={{ fontSize: '14px' }}>
                          Price ({cartItems.length} Items)
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '14px' }}>
                          AED {subtotal.toFixed(2)}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1" sx={{ fontSize: '14px' }}>
                          Delivery Charge
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: '14px' }}>
                          AED {deliveryCharge.toFixed(2)}
                        </Typography>
                      </Box>
                      
                      <Divider />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }} >
                          Total Price
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#e74c3c', fontSize: '16px', }} >
                          AED {total.toFixed(2)}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Stack spacing={2}>
                  <Button
                    component={Link} to="/"
                    variant="outlined" size="large" fullWidth
                    sx={{ borderColor: '#333', color: '#333', fontWeight: 'bold', py: 1.5,
                      '&:hover': { borderColor: '#555', backgroundColor: 'rgba(51, 51, 51, 0.04)' }
                    }}
                  >
                    CONTINUE SHOPPING
                  </Button>
                  
                  <Button
                    component={Link} to="/checkout" variant="contained" size="large" fullWidth
                    sx={{ backgroundColor: '#e74c3c', color: 'white', fontWeight: 'bold', py: 1.5,
                      '&:hover': { backgroundColor: '#c0392b' }
                    }}
                  >
                    PLACE ORDER
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default CartContent;
