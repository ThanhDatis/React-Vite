import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Kiểm tra localStorage và lấy dữ liệu giỏ hàng nếu có
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    // Lưu giỏ hàng vào localStorage mỗi khi giỏ hàng thay đổi
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = (product) => {
        setCartItems(prevItems => {
            // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
            const existingItem = prevItems.find(
                item => item.id === product.id && item.size === product.size
            );
            
            if (existingItem) {
                // Nếu sản phẩm đã tồn tại (cùng ID và size), tăng số lượng
                return prevItems.map(item =>
                    (item.id === product.id && item.size === product.size)
                        ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                        : item
                );
            }
            
            // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới
            return [...prevItems, { ...product, quantity: product.quantity || 1 }];
        });
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeFromCart = (productId, size) => {
        setCartItems(prevItems => 
            prevItems.filter(item => !(item.id === productId && item.size === size))
        );
    };

    // Cập nhật số lượng sản phẩm
    const updateQuantity = (productId, size, change) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                (item.id === productId && item.size === size)
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    // Tính tổng số sản phẩm trong giỏ hàng
    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Tính tổng tiền giỏ hàng
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.salePrice.replace(/[^\d.-]/g, '')) || 0;
            return total + (price * item.quantity);
        }, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            getCartItemCount,
            getCartTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook để sử dụng CartContext
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 