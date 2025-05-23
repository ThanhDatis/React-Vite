import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaHeart, FaMinus, FaPlus, FaStar } from 'react-icons/fa';
import { categories } from '../../data/productData';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { useCart } from '../../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  // Dữ liệu mẫu cho đánh giá
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
    // Tìm sản phẩm và category từ tất cả các danh mục
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

          // Lấy các sản phẩm liên quan (4 sản phẩm cùng danh mục, trừ sản phẩm hiện tại)
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

  const formatPrice = (price) => {
    if (typeof price === 'string') return price;
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
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

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar key={index} className={index < rating ? 'star-filled' : 'star-empty'} />
    ));
  };

  if (!product || !category) {
    return <div className="loading">Đang tải...</div>;
  }

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: category.name, path: `/${category.path}` },
    { label: product.title }
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="product-detail">
        {/* Left section - Image gallery */}
        <div className="product-images">
          <div className="main-image">
            <img src={product.images[selectedImage]} alt={product.title} />
          </div>
          <div className="thumbnail-list">
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.title} ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right section - Product info */}
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <h3 className="product-brand">{product.brand}</h3>
          
          <div className="product-price">
            <span className="sale-price">{product.newPrice}</span>
            <span className="original-price">{product.oldPrice}</span>
            {product.discount && <span className="discount">{product.discount}</span>}
          </div>

          <div className="product-sizes">
            <h3>Size:</h3>
            <div className="size-options">
              {product.sizes.map(size => (
                <button 
                  key={size} 
                  className={`size-button ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-section">
            <h3>Số lượng:</h3>
            <div className="quantity-controls">
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange('decrease')}
              >
                <FaMinus />
              </button>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              <button 
                className="quantity-btn"
                onClick={() => handleQuantityChange('increase')}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="buy-now" onClick={handleBuyNow}>
              Mua ngay
            </button>
            <button 
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <FaHeart />
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="product-details-tabs">
        <div className="tabs-header">
          <button 
            className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Mô tả sản phẩm
          </button>
          <button 
            className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Đánh giá ({reviews.length})
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-content">
              <p>{product.description}</p>
              <h4>Đặc điểm nổi bật:</h4>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-content">
              <div className="reviews-summary">
                <h3>Đánh giá từ khách hàng</h3>
                <div className="average-rating">
                  {renderStars(4.5)}
                  <span>4.5/5 ({reviews.length} đánh giá)</span>
                </div>
              </div>
              
              <div className="reviews-list">
                {reviews.map(review => (
                  <div key={review.id} className="review-item">
                    <div className="review-header">
                      <span className="review-user">{review.user}</span>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                      <span className="review-date">{review.date}</span>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="related-products">
        <h2 className="section-title">Sản phẩm liên quan</h2>
        <div className="related-products-grid">
          {relatedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.title} />
                <button 
                  className="cart-btn"
                  onClick={() => handleQuickAddToCart(product.id)}
                >
                  Add to Cart
                </button>
              </div>
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
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetail; 