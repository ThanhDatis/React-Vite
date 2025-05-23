import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCardItem.css';

const ProductCardItemContent = ({ product, showCategory = false }) => (
  <div className="productItemCard">
    <Link to={`/product/${product.id}`} className="productImage">
      <img src={product.image} alt={product.title} />
      {showCategory && product.category && <div className="categoryTag">{product.category}</div>}
      <div className="productActions">
        <button className="wishlist-btn" onClick={(e) => e.preventDefault()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 12.572L12 20L4.5 12.572C4.01432 12.0906 3.63629 11.5129 3.3886 10.8723C3.14092 10.2316 3.02835 9.54185 3.05798 8.85061C3.08761 8.15936 3.25852 7.48383 3.55789 6.86702C3.85726 6.25021 4.27869 5.70388 4.79624 5.26282C5.3138 4.82175 5.91451 4.49425 6.55823 4.30149C7.20195 4.10873 7.87632 4.05473 8.54074 4.14324C9.20516 4.23175 9.84115 4.46076 10.4092 4.81282C10.9772 5.16488 11.4654 5.63323 11.844 6.18572C12.2254 5.6332 12.716 5.16468 13.2866 4.8122C13.8572 4.45973 14.4958 4.23007 15.1628 4.14086C15.8298 4.05165 16.5069 4.10499 17.1533 4.29724C17.7997 4.48949 18.403 4.81667 18.9227 5.25764C19.4425 5.69862 19.8657 6.24511 20.1662 6.8624C20.4667 7.4797 20.6381 8.15595 20.6677 8.84794C20.6973 9.53993 20.5841 10.2304 20.3353 10.8717C20.0865 11.513 19.7071 12.0911 19.22 12.572H19.5Z" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="cart-btn" onClick={(e) => e.preventDefault()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.25 22.5C11.2165 22.5 12 21.7165 12 20.75C12 19.7835 11.2165 19 10.25 19C9.2835 19 8.5 19.7835 8.5 20.75C8.5 21.7165 9.2835 22.5 10.25 22.5Z" fill="#333333"/>
            <path d="M18.75 22.5C19.7165 22.5 20.5 21.7165 20.5 20.75C20.5 19.7835 19.7165 19 18.75 19C17.7835 19 17 19.7835 17 20.75C17 21.7165 17.7835 22.5 18.75 22.5Z" fill="#333333"/>
            <path d="M2.5 3L7 6L9.5 17H19.5L22 8.5H12.5" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.5 13H16.1364H20.5" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </Link>
    <Link to={`/product/${product.id}`} className="productInfo">
      <div className="titleBrand">
        <h1 className="title">{product.title}</h1>
        <h3 className="brand">{product.brand}</h3>
      </div>
      <div className="priceAndDiscount">
        <span className="oldPrice">{product.oldPrice}</span>
        <span className="newPrice">{product.newPrice}</span>
        <p className="discount">{product.discount}</p>
      </div>
    </Link>
  </div>
);

export default ProductCardItemContent; 