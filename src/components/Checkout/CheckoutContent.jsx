import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import './Checkout.css';

const CheckoutContent = () => {
  const { cartItems, getCartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
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

  const handleShippingInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData({
      ...shippingData,
      [name]: value
    });
  };

  const handlePaymentInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleContinue = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
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

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="checkout-container">
        <h1 className="checkout-title">CHECKOUT</h1>
        
        <div className="checkout-steps">
          <div className="step-indicators">
            <div className={`step-indicator ${currentStep >= 1 ? 'active' : ''}`}>1</div>
            <div className="step-line"></div>
            <div className={`step-indicator ${currentStep >= 2 ? 'active' : ''}`}>2</div>
          </div>
          <div className="step-labels">
            <div className={`step-label ${currentStep === 1 ? 'active' : ''}`}>Shipping Details</div>
            <div className={`step-label ${currentStep === 2 ? 'active' : ''}`}>Billing Details</div>
          </div>
        </div>
        
        <div className="checkout-content">
          {/* Left Column - Checkout Form */}
          <div className="checkout-form">
            {currentStep === 1 && (
              <div className="shipping-details">
                <h2 className="section-title">Shipping Details</h2>
                
                <div className="form-row-checkout">
                  <div className="form-group-checkout">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={shippingData.firstName}
                      onChange={handleShippingInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group-checkout">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={shippingData.lastName}
                      onChange={handleShippingInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row-checkout">
                  <div className="form-group-checkout">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={shippingData.email}
                      onChange={handleShippingInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group-checkout">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={shippingData.phone}
                      onChange={handleShippingInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group-checkout">
                  <label htmlFor="streetAddress">Street Address</label>
                  <input
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    placeholder="House number and street name"
                    value={shippingData.streetAddress}
                    onChange={handleShippingInputChange}
                    required
                  />
                </div>
                
                <div className="form-row-checkout">
                  <div className="form-group-checkout">
                    <label htmlFor="ward">Ward</label>
                    <input
                      type="text"
                      id="ward"
                      name="ward"
                      value={shippingData.ward}
                      onChange={handleShippingInputChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group-checkout">
                    <label htmlFor="district">District</label>
                    <input
                      type="text"
                      id="district"
                      name="district"
                      value={shippingData.district}
                      onChange={handleShippingInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group-checkout">
                  <label htmlFor="city">City/Province</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingData.city}
                    onChange={handleShippingInputChange}
                    required
                  />
                </div>
                
                <div className="form-group-checkout">
                  <label htmlFor="description">Delivery Instructions (Optional)</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    placeholder="Special notes for delivery"
                    value={shippingData.description}
                    onChange={handleShippingInputChange}
                  ></textarea>
                </div>
                
                <div className="form-actions">
                  <button className="btn-continue" onClick={handleContinue}>
                    CONTINUE
                  </button>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="billing-details">
                <h2 className="section-title">Billing Details</h2>
                
                {/* Shipping Info Summary */}
                <div className="shipping-summary">
                  <h3>Customer Information</h3>
                  <div className="info-summary">
                    <div className="info-row">
                      <div className="info-group">
                        <label>Họ và tên:&nbsp;</label>
                        <p>{shippingData.firstName} {shippingData.lastName}</p>
                      </div>
                      <div className="info-group">
                        <label>Email:&nbsp;</label>
                        <p>{shippingData.email}</p>
                      </div>
                    </div>
                    
                    <div className="info-row single">
                      <div className="info-group">
                        <label>Số điện thoại:&nbsp;</label>
                        <p>{shippingData.phone}</p>
                      </div>
                    </div>
                    
                    <div className="info-row single">
                      <div className="info-group">
                        <label>Địa chỉ:&nbsp;</label>
                        <p>{shippingData.streetAddress}</p>
                      </div>
                    </div>
                    
                    <div className="info-row">
                      <div className="info-group">
                        <label>Phường/Xã:&nbsp;</label>
                        <p>{shippingData.ward}</p>
                      </div>
                      <div className="info-group">
                        <label>Quận/Huyện:&nbsp;</label>
                        <p>{shippingData.district}</p>
                      </div>
                    </div>
                    
                    <div className="info-row single">
                      <div className="info-group">
                        <label>Tỉnh/Thành phố:&nbsp;</label>
                        <p>{shippingData.city}</p>
                      </div>
                    </div>
                    
                    {shippingData.description && (
                      <div className="info-row single">
                        <div className="info-group">
                          <label>Ghi chú:&nbsp;</label>
                          <p>{shippingData.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Payment Methods */}
                <div className="payment-methods">
                  <h3>Payment Method</h3>
                  
                  <div className="payment-options">
                    <div className="payment-option">
                      <input
                        type="radio"
                        id="cashOnDelivery"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentData.paymentMethod === 'cash'}
                        onChange={handlePaymentInputChange}
                      />
                      <label htmlFor="cashOnDelivery">
                        <FaMoneyBillWave className="payment-icon" />
                        Cash on Delivery
                      </label>
                    </div>
                    
                    <div className="payment-option">
                      <input
                        type="radio"
                        id="creditCard"
                        name="paymentMethod"
                        value="credit"
                        checked={paymentData.paymentMethod === 'credit'}
                        onChange={handlePaymentInputChange}
                      />
                      <label htmlFor="creditCard">
                        <FaCreditCard className="payment-icon" />
                        Credit Card
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Credit Card Details (conditionally rendered) */}
                {paymentData.paymentMethod === 'credit' && (
                  <div className="credit-card-details">
                    <div className="form-group-checkout">
                      <label htmlFor="cardholderName">Cardholder Name</label>
                      <input
                        type="text"
                        id="cardholderName"
                        name="cardholderName"
                        value={paymentData.cardholderName}
                        onChange={handlePaymentInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group-checkout">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-group-checkout">
                      <label htmlFor="branch">Branch</label>
                      <input
                        type="text"
                        id="branch"
                        name="branch"
                        value={paymentData.branch}
                        onChange={handlePaymentInputChange}
                        required
                      />
                    </div>
                    
                    <div className="form-row-checkout">
                      <div className="form-group-checkout">
                        <label htmlFor="expiryDate">Expiration Date (MM/YYYY)</label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YYYY"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentInputChange}
                          required
                        />
                      </div>
                      
                      <div className="form-group-checkout">
                        <label htmlFor="cvv">CVV</label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="XXX"
                          value={paymentData.cvv}
                          onChange={handlePaymentInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Terms and Conditions */}
                <div className="terms-and-conditions">
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={paymentData.agreeToTerms}
                      onChange={handlePaymentInputChange}
                      required
                    />
                    <label htmlFor="agreeToTerms">
                      I agree to the <a href="#">Terms and Conditions</a>
                    </label>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button className="btn-back" onClick={handleBack}>
                    BACK
                  </button>
                  <button 
                    className="btn-place-order" 
                    onClick={handlePlaceOrder}
                    disabled={!paymentData.agreeToTerms}
                  >
                    PLACE ORDER
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Right Column - Order Summary */}
          <div className="order-summary">
            <div className="summary-card">
              <h2 className="summary-title">Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>AED {subtotal.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Delivery Fee</span>
                <span>AED {deliveryFee.toFixed(2)}</span>
              </div>
              
              <div className="promo-code">
                <input
                  type="text"
                  placeholder="Enter Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button className="btn-apply">APPLY</button>
              </div>
              
              <div className="summary-row total">
                <span>Total</span>
                <span>AED {total.toFixed(2)}</span>
              </div>
              
              <div className="summary-items">
                <h3>Items in your order</h3>
                <ul className="summary-item-list">
                  {cartItems.map((item, index) => (
                    <li key={`${item.id}-${item.size}-${index}`} className="summary-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.title} />
                        <span className="item-quantity">{item.quantity}</span>
                      </div>
                      <div className="item-info">
                        <h4>{item.title}</h4>
                        <p>{item.size && `Size: ${item.size}`}</p>
                      </div>
                      <div className="item-price">
                        {item.salePrice && `AED ${parseFloat(item.salePrice).toFixed(2)}`}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutContent; 
