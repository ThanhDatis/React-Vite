import React, { useState, useEffect, useRef } from 'react';
import productImage from '../../../assets/images/image.png';
import './MyOrders.css';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const popupContentRef = useRef(null);
    const scrollTimeoutRef = useRef(null);

    // Mock data - thay thế bằng API call thực tế
    useEffect(() => {
        const mockOrders = [
            {
                id: 'ORD001',
                orderCode: 'DH001234',
                items: [
                    { 
                        id: 1, 
                        name: 'iPhone 15 Pro Max', 
                        image: productImage,
                        quantity: 1,
                        price: 29990000
                    },
                    { 
                        id: 2, 
                        name: 'AirPods Pro', 
                        image: productImage,
                        quantity: 1,
                        price: 6990000
                    }
                ],
                totalQuantity: 2,
                totalAmount: 36980000,
                status: 'delivered',
                orderDate: '2024-01-15'
            },
            {
                id: 'ORD002',
                orderCode: 'DH001235',
                items: [
                    { 
                        id: 3, 
                        name: 'Samsung Galaxy S24', 
                        image: productImage,
                        quantity: 1,
                        price: 22990000
                    }
                ],
                totalQuantity: 1,
                totalAmount: 22990000,
                status: 'shipping',
                orderDate: '2024-01-20'
            },
            {
                id: 'ORD003',
                orderCode: 'DH001236',
                items: [
                    { 
                        id: 4, 
                        name: 'MacBook Pro M3', 
                        image: productImage,
                        quantity: 1,
                        price: 52990000
                    }
                ],
                totalQuantity: 1,
                totalAmount: 52990000,
                status: 'processing',
                orderDate: '2024-01-25'
            }
        ];

        setTimeout(() => {
            setOrders(mockOrders);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (popupContentRef.current) {
                popupContentRef.current.classList.add('is-scrolling');
                
                // Clear previous timeout
                if (scrollTimeoutRef.current) {
                    clearTimeout(scrollTimeoutRef.current);
                }
                
                // Tăng thời gian ẩn lên 1.5 giây để phù hợp với animation
                scrollTimeoutRef.current = setTimeout(() => {
                    if (popupContentRef.current) {
                        popupContentRef.current.classList.remove('is-scrolling');
                    }
                }, 1500); // Change time scroll
            }
        };

        const popupContent = popupContentRef.current;
        if (popupContent) {
            popupContent.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (popupContent) {
                popupContent.removeEventListener('scroll', handleScroll);
            }
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [showPopup]);

    const getStatusText = (status) => {
        const statusMap = {
            'processing': 'Processing',
            'shipping': 'Shipping',
            'delivered': 'Delivered',
            'cancelled': 'Cancelled'
        };
        return statusMap[status] || status;
    };

    const getStatusClass = (status) => {
        return `status-${status}`;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const handleViewDetails = (orderId) => {
        const order = orders.find(order => order.id === orderId);
        setSelectedOrder(order);
        setShowPopup(true);
    };

    const closePopup = () => {
        setSelectedOrder(null);
        setShowPopup(false);
    };

    if (loading) {
        return (
            <div className="my-orders">
                <h2>My Orders</h2>
                <div className="loading">Loading...</div>
            </div>
        );
    }

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            
            {orders.length === 0 ? (
                <div className="no-orders">
                    <p>You have no orders.</p>
                </div>
            ) : (
                <div className="orders-table-container">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Order Code</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="product-thumbnail">
                                        <img 
                                            src={order.items[0]?.image} 
                                            alt={order.items[0]?.name}
                                            className="thumbnail-image"
                                        />
                                    </td>
                                    <td className="order-code">{order.orderCode}</td>
                                    <td className="quantity">{order.totalQuantity}</td>
                                    <td className="total-amount">{formatPrice(order.totalAmount)}</td>
                                    <td className="status">
                                        <span className={`status-badge ${getStatusClass(order.status)}`}>
                                            {getStatusText(order.status)}
                                        </span>
                                    </td>
                                    <td className="actions">
                                        <button 
                                            className="view-details-btn"
                                            onClick={() => handleViewDetails(order.id)}
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showPopup && selectedOrder && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div 
                        className="popup-content" 
                        onClick={(e) => e.stopPropagation()}
                        ref={popupContentRef}
                    >
                        <div className="popup-header">
                            <h3>Order Details</h3>
                            <button className="close-btn" onClick={closePopup}>x</button>
                        </div>

                        <div className="popup-body">
                            <div className="order-info">
                                <div className="info-row">
                                    <span className="label">Order Code:</span>
                                    <span className="value">{selectedOrder.orderCode}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Order Date:</span>
                                    <span className="value">{new Date(selectedOrder.orderDate).toLocaleDateString('vi-VN')}</span>
                                </div>
                                <div className="info-row">
                                    <span className="label">Status:</span>
                                    <span className={`status-badge ${getStatusClass(selectedOrder.status)}`}>
                                        {getStatusText(selectedOrder.status)}
                                    </span>
                                </div>
                            </div>
                            
                            <div className="products-section">
                                <h4>Products</h4>
                                <div className="products-list">
                                    {selectedOrder.items.map((item) => (
                                        <div className="product-item" key={item.id}>
                                            <img 
                                                src={item.image} 
                                                alt={item.name} 
                                                className="product-image" 
                                            />
                                            <div className="product-details">
                                                <h5>{item.name}</h5>
                                                <div className="product-meta">
                                                    <span>So luong: {item.quantity}</span>
                                                    <span className="price">{formatPrice(item.price)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="order-summary">
                                <div className="summary-row">
                                    <span className="label">Total Quantity:</span>
                                    <span className="value">{selectedOrder.totalQuantity} sản phẩm</span>
                                </div>
                                <div className="summary-row total">
                                    <span className="label">Total Amount:</span>
                                    <span className="value">{formatPrice(selectedOrder.totalAmount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyOrders;