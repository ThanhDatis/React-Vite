import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { useCart } from '../../context/CartContext';
import './Cart.css';

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
      <div className="cart-container">
        <h1 className="cart-title">CART</h1>
        
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <h2>Giỏ hàng của bạn đang trống</h2>
            <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
            <Link to="/" className="continue-shopping">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            {/* Left Column - Cart Items */}
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="item-details">
                    <h3 className="item-title">{item.title}</h3>
                    {item.brand && <p className="item-brand">{item.brand}</p>}
                    {item.size && <p className="item-size">Size: {item.size}</p>}
                    <div className="item-price">
                      <span className="original-price">AED {item.price ? parseFloat(item.price).toFixed(2) : "0.00"}</span>
                      <span className="sale-price">AED {item.salePrice ? parseFloat(item.salePrice).toFixed(2) : "0.00"}</span>
                    </div>
                    <div className="item-quantity">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.size, -1)}
                      >
                        <FaMinus />
                      </button>
                      <input 
                        type="number" 
                        value={item.quantity}
                        readOnly
                      />
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.size, 1)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    REMOVE
                  </button>
                </div>
              ))}
            </div>

            {/* Right Column - Summary */}
            <div className="cart-summary">
              <div className="promo-code">
                <h3>Add Promo Code</h3>
                <div className="promo-input">
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                  />
                  <button className="add-promo-btn">ADD</button>
                </div>
              </div>

              <div className="summary-details">
                <h3>Summary</h3>
                <div className="summary-row">
                  <span>Price ({cartItems.length} Items)</span>
                  <span>AED {subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Charge</span>
                  <span>AED {deliveryCharge.toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Price</span>
                  <span>AED {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="cart-actions">
                <Link to="/" className="continue-shopping">
                  CONTINUE SHOPPING
                </Link>
                <Link to="/checkout" className="place-order">
                  PLACE ORDER
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartContent;
