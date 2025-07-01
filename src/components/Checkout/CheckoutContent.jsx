import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../store/contexts/CartContext';
import Breadcrumb from '../ui/Breadcrumb/Breadcrumb';
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
  const [errors, setErrors] = useState({ // eslint-disable-line no-unused-vars
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
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

    let formattedValue = value;

    if (name === 'cardholderName') {
      formattedValue = value.toUpperCase().trim();
      
      const isValid = /^[A-Z\s]+$/.test(formattedValue);

      setErrors((prev) => ({
        ...prev,
        cardholderName: isValid ? '' : 'Invalid name'
      }));
    }

    if (name === 'cardNumber') {
      formattedValue = formCardNumber(value);
    }

    if (name === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
    }

    setPaymentData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : formattedValue
    }));

    if (name === 'cardNumber') {
      const cleanedValue = formattedValue.replace(/\D/g, '');
      const isValid = isValidCardNumber(cleanedValue);
      
      setErrors((prev) => ({
        ...prev,
        cardNumber: 
        cleanedValue.length < 16
        ? 'Card number must be 16 digits'
        : isValid
        ? ''
        : 'Invalid card number'
      }));
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
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
    { label: 'First Name', name: 'firstName', type: 'text', id: 'firstName' },
    { label: 'Last Name', name: 'lastName', type: 'text', id: 'lastName' },
    { label: 'Email', name: 'email', type: 'email', id: 'email' },
    { label: 'Phone Number', name: 'phone', type: 'tel', id: 'phone' },
    { label: 'Street Address', name: 'streetAddress', type: 'text', id: 'streetAddress', placeholder: 'House number and street name' },
    { label: 'Ward', name: 'ward', type: 'text', id: 'ward' },
    { label: 'District', name: 'district', type: 'text', id: 'district' },
    { label: 'City/Province', name: 'city', type: 'text', id: 'city' },
  ];

  const ShippingTextField = ({ 
    label, 
    name, 
    value, 
    rows, 
    onChange, 
    multiline = false, 
    placeholder,
    type = 'text'
  }) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      value={value}
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
        },  
        // '& .MuiFormLabel-asterisk': {
        //   display: 'inline',
        //   lineHeight: 1,
        //   marginLeft: '2px',
        //   color: 'red'
        // }
      }}
      key={name}
    />
  );
  
  
  const renderShippingForm = () => {
    return (
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
              label={field.label}
              name={field.name}
              type={field.type}
              value={shippingData[field.name]}
              onChange={handleShippingInputChange}
              placeholder={field.placeholder}
              multiline={field.multiline}
              rows={field.rows}
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
    )
};

  const BillingField = [
    [
      { id: 'fullName', label: 'Họ và tên', value: (data) => `${data.firstName} ${data.lastName}`.trim() || 'Trống' },
      { id: 'customerEmail', label: 'Email', value: (data) => data.email || "Trống" }
    ],
    [
      { id: 'customerPhone', label: 'Số điện thoại', value: (data) => data.phone || 'Trống' }
    ],
    [
      { id: 'street', label: 'Đường số', value: (data) => data.streetAddress || 'Trống' },
      { id: 'wardArea', label: 'Phường/Xã', value: (data) => data.ward || 'Trống' }
    ],
    [
      { id: 'districtArea', label: 'Quận/Huyện', value: (data) => data.district || 'Trống' },
      { id: 'cityProvince', label: 'Tỉnh/Thành phố', value: (data) => data.city || 'Trống' }
    ],
    [
      { id: 'notes', label: 'Ghi chú', value: (data) => data.description || 'Trống' }
    ]
  ];

  const formCardNumber = (value) => {
    return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
    .trim();
  }

  const isValidCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length < 4 || cleanedValue.length > 16) {
      return false;
    }

    let sum = 0;
    let shouldDouble = false;

    for (let i = cleanedValue.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanedValue[i], 10);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }

  const formatExpiryDate = (value) => {
    const cleanedValue = value.replace(/\D/g, '');

    if (cleanedValue.length === 0) return '';
    if (cleanedValue.length <= 2) return cleanedValue;

    return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 6)}`;
  }
  
  const BillingInfo = ({ label, value }) => (
    <Box 
      sx={{
        display: 'flex',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <Typography 
        variant="body2" 
        sx={{
          
          color: '#6B7280',
          fontSize: '16px',
          flexShrink: 0,          
        }}
      >
        {label}
        <span style={{ marginRight: '10px' }}>:</span>
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: '#000',
          fontSize: '16px',
          flex: 1,
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
            pb: 1,
            mb: 3,
            fontWeight: 600,
            fontSize: '18px',
            borderBottom: '2px solid #CAE5E8'
          }}
        >
          Customer Information
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {BillingField.map((row, rowIndex) => (
            <Box 
              key={rowIndex}
              sx={{ 
                display: 'flex',
                gap: 1,
                width: '100%',
              }}
            >
              {row.map((field) => (
                <BillingInfo
                  key={field.id}
                  label={field.label}
                  value={field.value(shippingData)}
                />
              ))}
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Payment Methods */}
      <Box sx={{ mb: 0 }}>
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
                minWidth: '325.5px',
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
                sx={{ 
                  width: '100%',
                  margin: 0
                 }}
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
                minWidth: '325.5px',
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
                sx={{ 
                  width: '100%',
                  margin: 0,
                 }}
              />
            </Paper>
          </Box>
        </FormControl>
      </Box>

      {/* Credit Card Details */}
      {paymentData.paymentMethod === 'credit' && (
        <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          backgroundColor: '#f9fafb', 
          borderRadius: 2,
          animation: 'fadeIn 0.3s ease-in-out',
          '&:hover': {
            from: {
              opacity: 0,
              transform: 'translateY(-10px)'
            },
            to: {
              opacity: 1,
              transform: 'translateY(0)'
            }
          }
        }}>
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
                placeholder="Enter name as shown on card"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                name="cardNumber"
                placeholder="1234 1234 1234 1234"
                value={paymentData.cardNumber}
                onChange={handlePaymentInputChange}
                required
                variant="outlined"
                inputProps={{
                  maxLength: 19,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                      <CreditCard sx={{ color: '#666', fontSize: 22 }}/>
                    </Box>
                  )
                }}
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
                placeholder="Enter branch name"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  }
                }}
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
                inputProps={{
                  maxLength: 7,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CVV"
                name="cvv"
                type="password"
                placeholder="XXX"
                value={paymentData.cvv}
                onChange={handlePaymentInputChange}
                required
                variant="outlined"
                inputProps={{
                  maxLength: 3,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#fff',
                  }
                }}
                helperText="3-4 digits on back of card"
              />
            </Grid>
          </Grid>
        </Paper>
      )}
      
      {/* Terms and Conditions */}
      <Box sx={{ 
          mt: 1, 
          p: 1,
          backgroundColor: '#e8f5e8',
          borderRadius: 1,
          border: '1px solid #C3e6c3'
        }}
      >
        {/* <Typography 
        variant="caption" 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          color: '#2e7d32',
          fontSize: '0.875rem'
        }}
      >
        🔒 Your payment information is encrypted and secure
      </Typography> */}
        <FormControlLabel
          control={
            <Checkbox
              name="agreeToTerms"
              checked={paymentData.agreeToTerms}
              onChange={handlePaymentInputChange}
              required={false}
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2">
                I agree to the{' '}
                <MuiLink href="#" underline="hover">
                  Terms and Conditions
                </MuiLink>
              </Typography>
              <Typography 
                variant="body2" 
                component="span"
                sx={{ 
                  color: 'error.main',
                  lineHeight: 1,
                  ml: 0.5
                }}
              >
                *
              </Typography>
            </Box>
          }
          sx={{
            '& .MuiFormControlLabel-asterisk': {
              display: 'none'
            }
          }}
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

  // Stepper component
  const Stepper = () => (
    <Box sx={{ mb: 4 }}>
      {/* Step indicators */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 1 }}>
        {steps.map((_, index) => (
          <React.Fragment key={index}>
            <Box 
              sx={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                bgcolor: index <= activeStep ? '#000' : '#CAE5E8',
                color: index <= activeStep ? '#fff' : '#000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 500,
                transition: 'all 0.3s ease'
              }}
            >
              {index + 1}
            </Box>
            {index < steps.length - 1 && (
              <Box 
                sx={{ 
                  width: 200,
                  height: 2,
                  bgcolor: index < activeStep ? '#000' : '#CAE5E8',
                  transition: 'background-color 0.3s ease'
                }} 
              />
            )}
          </React.Fragment>
        ))}
      </Box>

      {/* Step labels */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
        {steps.map((label, index) => (
          <Typography 
            key={index}
            sx={{ 
              fontWeight: 500,
              color: index <= activeStep ? '#000' : '#6B7280',
              transition: 'color 0.3s ease'
            }}
          >
            {label}
          </Typography>
        ))}
      </Box>
    </Box>
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
        <Stepper />
        
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '3fr 2fr' },
            gap: { xs: 3, md: 5 }
          }}
        >
          <Box>
            {activeStep === 0 && renderShippingForm()}
            {activeStep === 1 && renderBillingForm()}
          </Box>          
          <Box>
            {renderOrderSummary()}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CheckoutContent;