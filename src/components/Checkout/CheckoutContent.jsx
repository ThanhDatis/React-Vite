import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Radio,
  FormControlLabel,
  FormControl,
  Checkbox,
  Card,
  CardContent,
  Divider,
  Paper,
  Avatar,
  Link as MuiLink
} from '@mui/material';
import {
  CreditCard,
  MoneyOff,
  ArrowBack,
  ArrowForward
} from '@mui/icons-material';

const CheckoutContent = () => {
  const { cartItems, getCartTotal } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  
  // Shipping form data
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    ward: '',
    district: '',
    city: '',
    description: ''
  });

  // Payment form data
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'cash',
    cardholderName: '',
    cardNumber: '',
    branch: '',
    expiryDate: '',
    cvv: '',
    agreeToTerms: false
  });

  const steps = ['Shipping Details', 'Billing Details'];

  const handleShippingInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePlaceOrder = () => {
    if (!paymentData.agreeToTerms) {
      alert('You must agree to the terms and conditions to place an order.');
      return;
    }
    // Process order here
    alert('Order placed successfully!');
  };

  const subtotal = getCartTotal();
  const deliveryFee = 15.00;
  const total = subtotal + deliveryFee;

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Cart', path: '/cart' },
    { label: 'Checkout' }
  ];

  const ShippingField = [
    { label: 'First Name', name: 'firstName', type: 'text'},
    { label: 'Last Name', name: 'lastName', type: 'text'},
    { label: 'Email', name: 'email', type: 'email'},
    { label: 'Phone Number', name: 'phone', type: 'tel'},
    { label: 'Street Address', name: 'streetAddress', placeholder: 'House number and street name'},
    { label: 'Ward', name: 'ward'},
    { label: 'District', name: 'district'},
    { label: 'City/Province', name: 'city'},
  ];

  const ShippingTextField = ({ 
    label, 
    name, 
    value, 
    rows, 
    onChange, 
    multiline = false, 
    placeholder,
    type
  }) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value || ''}
      onChange={onChange}
      variant="outlined"
      size="small"
      type={type}
      required={!label?.toLowerCase().includes('optional')}
      multiline={multiline}
      rows={rows}
      placeholder={placeholder}
      sx={{
        width: multiline ? '665px' : '320px',
        '& .MuiOutlinedInput-root': {
          bgcolor: '#fff'
        }
      }}
    />
  );

  const renderShippingForm = () => (
    <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
      <Typography 
        variant="h6" 
        component="h2" 
        sx={{ 
          mb: 3,
          fontWeight: 600,
          fontSize: '20px',
          textAlign: 'center'
        }}
      >
        Shipping Details
      </Typography>
      
      <Grid container spacing={3}>
        {ShippingField.map((field) => (
          <Grid item xs={12} sm={6} key={field.name}>
            <ShippingTextField
              {...field}
              value={shippingData[field.name]}
              onChange={handleShippingInputChange}
            />
          </Grid>
        ))}
        
        {/* Delivery Instructions */}
        <Grid item xs={12}>
          <ShippingTextField
            label="Delivery Instructions"
            name="description"
            value={shippingData.description}
            onChange={handleShippingInputChange}
            multiline
            rows={4}
            placeholder="Special notes for delivery"
          />
        </Grid>
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          variant="contained"
          onClick={handleNext}
          endIcon={<ArrowForward />}
          sx={{
            bgcolor: '#000',
            '&:hover': {
              bgcolor: '#333'
            },
            px: 3,
            py: 1,
            fontSize: '12px'
          }}
        >
          CONTINUE
        </Button>
      </Box>
    </Card>
  );

  const BillingField = [
    [
      { label: 'Họ và tên', value: (data) => `${data.firstName} ${data.lastName}` },
      { label: 'Email', value: (data) => data.email }
    ],
    [
      { label: 'Số điện thoại', value: (data) => data.phone }
    ],
    [
      { label: 'Đường số', value: (data) => data.streetAddress },
      { label: 'Phường/Xã', value: (data) => data.ward }
    ],
    [
      { label: 'Quận/Huyện', value: (data) => data.district },
      { label: 'Tỉnh/Thành phố', value: (data) => data.city }
    ]
  ];

  const BillingInfo = ({ label, value }) => (
    <Box sx={{ mb: 2 }}>
      <Typography 
        variant="body2" 
        sx={{ 
          mb: 1, 
          color: '#6B7280',
          fontSize: '14px',
          fontWeight: 500
        }}
      >
        {label}
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#000',
          fontSize: '15px',
          fontWeight: 500
        }}
      >
        {value}
      </Typography>
    </Box>
  );

  const renderBillingForm = () => (
    <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
      <Typography 
        variant="h6" 
        component="h2" 
        sx={{ 
          mb: 3,
          fontWeight: 600,
          fontSize: '20px',
          textAlign: 'center'
        }}
      >
        Billing Details
      </Typography>

      <Paper 
        elevation={0} 
        sx={{ 
          p: 3,
          mb: 3,
          bgcolor: '#f9fafb',
          border: '2px solid #CAE5E8',
          borderRadius: 2
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            pb: 2,
            mb: 3,
            fontWeight: 600,
            fontSize: '18px',
            borderBottom: '2px solid #CAE5E8'
          }}
        >
          Customer Information
        </Typography>

        <Grid container spacing={3}>
          {BillingField.map((row, rowIndex) => (
            <Grid item xs={12} key={rowIndex}>
              <Grid container spacing={3}>
                {row.map((field, fieldIndex) => (
                  <Grid 
                    item 
                    xs={12} 
                    sm={row.length > 1 ? 6 : 12} 
                    key={fieldIndex}
                  >
                    <BillingInfo
                      label={field.label}
                      value={field.value(shippingData)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Payment Methods */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Payment Method
        </Typography>
        
        <FormControl component="fieldset">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 2, 
                backgroundColor: '#f9fafb',
                border: paymentData.paymentMethod === 'cash' ? '2px solid #CAE5E8' : '2px solid transparent',
                borderRadius: 2,
                cursor: 'pointer',
                flex: 1,
                minWidth: '200px',
                '&:hover': { borderColor: '#CAE5E8' }
              }}
            >
              <FormControlLabel
                value="cash"
                control={
                  <Radio 
                    checked={paymentData.paymentMethod === 'cash'}
                    onChange={handlePaymentInputChange}
                    name="paymentMethod"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MoneyOff />
                    Cash on Delivery
                  </Box>
                }
                sx={{ width: '100%' }}
              />
            </Paper>
            
            <Paper 
              elevation={0}
              sx={{ 
                p: 2, 
                backgroundColor: '#f9fafb',
                border: paymentData.paymentMethod === 'credit' ? '2px solid #CAE5E8' : '2px solid transparent',
                borderRadius: 2,
                cursor: 'pointer',
                flex: 1,
                minWidth: '200px',
                '&:hover': { borderColor: '#CAE5E8' }
              }}
            >
              <FormControlLabel
                value="credit"
                control={
                  <Radio 
                    checked={paymentData.paymentMethod === 'credit'}
                    onChange={handlePaymentInputChange}
                    name="paymentMethod"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CreditCard />
                    Credit Card
                  </Box>
                }
                sx={{ width: '100%' }}
              />
            </Paper>
          </Box>
        </FormControl>
      </Box>
      
      {/* Credit Card Details */}
      {paymentData.paymentMethod === 'credit' && (
        <Paper elevation={0} sx={{ p: 3, mb: 3, backgroundColor: '#f9fafb', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Credit Card Details
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cardholder Name"
                name="cardholderName"
                value={paymentData.cardholderName}
                onChange={handlePaymentInputChange}
                required
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                placeholder="XXXX XXXX XXXX XXXX"
                value={paymentData.cardNumber}
                onChange={handlePaymentInputChange}
                required
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Branch"
                name="branch"
                value={paymentData.branch}
                onChange={handlePaymentInputChange}
                required
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Expiration Date"
                name="expiryDate"
                placeholder="MM/YYYY"
                value={paymentData.expiryDate}
                onChange={handlePaymentInputChange}
                required
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CVV"
                name="cvv"
                placeholder="XXX"
                value={paymentData.cvv}
                onChange={handlePaymentInputChange}
                required
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>
      )}
      
      {/* Terms and Conditions */}
      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              name="agreeToTerms"
              checked={paymentData.agreeToTerms}
              onChange={handlePaymentInputChange}
              required
            />
          }
          label={
            <Typography variant="body2">
              I agree to the{' '}
              <MuiLink href="#" underline="hover">
                Terms and Conditions
              </MuiLink>
            </Typography>
          }
        />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          startIcon={<ArrowBack />}
          sx={{ px: 4, py: 1.5 }}
        >
          BACK
        </Button>
        <Button
          variant="contained"
          onClick={handlePlaceOrder}
          disabled={!paymentData.agreeToTerms}
          sx={{
            backgroundColor: paymentData.agreeToTerms ? '#333' : '#d1d5db',
            '&:hover': { backgroundColor: paymentData.agreeToTerms ? '#555' : '#d1d5db' },
            '&:disabled': { backgroundColor: '#d1d5db', cursor: 'not-allowed' },
            px: 4,
            py: 1.5
          }}
        >
          PLACE ORDER
        </Button>
      </Box>
    </Card>
  );

  const renderOrderSummary = () => (
    <Card elevation={2} sx={{ position: 'sticky', top: 20, alignSelf: 'flex-start' }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
          Summary
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1">
            Subtotal ({cartItems.length} items)
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            AED {subtotal.toFixed(2)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1">Delivery Fee</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            AED {deliveryFee.toFixed(2)}
          </Typography>
        </Box>
        
        {/* Promo Code */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              variant="outlined"
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#333',
                '&:hover': { backgroundColor: '#555' },
                px: 2,
                whiteSpace: 'nowrap'
              }}
            >
              APPLY
            </Button>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Total
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            AED {total.toFixed(2)}
          </Typography>
        </Box>
        
        {/* Items in Order */}
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Items in your order
        </Typography>
        
        <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
          {cartItems.map((item, index) => (
            <Box
              key={`${item.id}-${item.size}-${index}`}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                pb: 2,
                mb: 2,
                borderBottom: index === cartItems.length - 1 ? 'none' : '1px solid #e5e7eb'
              }}
            >
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={item.image}
                  alt={item.title}
                  variant="rounded"
                  sx={{ width: 60, height: 60 }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 15,
                    height: 15,
                    backgroundColor: '#000',
                    color: 'white',
                    fontSize: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {item.quantity}
                </Box>
              </Box>
              
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  {item.title}
                </Typography>
                {item.size && (
                  <Typography variant="caption" color="text.secondary">
                    Size: {item.size}
                  </Typography>
                )}
              </Box>
              
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {item.salePrice && `AED ${parseFloat(item.salePrice).toFixed(2)}`}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <Container 
        maxWidth={false}
        sx={{ 
          maxWidth: '1200px',
          py: 4,
          px: { xs: 2, sm: 3 }
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          sx={{
            mb: 4,
            fontWeight: 500,
            fontSize: '1.75rem'
          }}
        >
          CHECKOUT
        </Typography>
        
        {/* Stepper */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 1 }}>
            <Box 
              sx={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                bgcolor: '#000',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 500
              }}
            >
              1
            </Box>
            <Box 
              sx={{ 
                width: 200,
                height: 2,
                bgcolor: '#CAE5E8'
              }} 
            />
            <Box 
              sx={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                bgcolor: '#CAE5E8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 500
              }}
            >
              2
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
            <Typography 
              sx={{ 
                fontWeight: 500,
                color: '#000'
              }}
            >
              Shipping Details
            </Typography>
            <Typography 
              sx={{ 
                fontWeight: 500,
                color: '#6B7280'
              }}
            >
              Billing Details
            </Typography>
          </Box>
        </Box>
        
        {/* Main Content - Two Columns */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' },
            gap: { xs: 3, md: 5 }
          }}
        >
          {/* Left Column - Forms */}
          <Box>
            {activeStep === 0 && renderShippingForm()}
            {activeStep === 1 && renderBillingForm()}
          </Box>
          
          {/* Right Column - Summary */}
          <Box>
            {renderOrderSummary()}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CheckoutContent;