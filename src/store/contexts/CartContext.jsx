import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem('cartItems');
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(
                item => item.id === product.id && item.size === product.size
            );
            
            if (existingItem) {
                return prevItems.map(item =>
                    (item.id === product.id && item.size === product.size)
                        ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                        : item
                );
            }
            
            return [...prevItems, { ...product, quantity: product.quantity || 1 }];
        });
    };

    const removeFromCart = (productId, size) => {
        setCartItems(prevItems => 
            prevItems.filter(item => !(item.id === productId && item.size === size))
        );
    };

    const updateQuantity = (productId, size, change) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                (item.id === productId && item.size === size)
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const getCartItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

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

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 