import { useContext } from 'react';
import { CartContext } from '../store/contexts/CartContext';

export const useCartHelpers = () => {
    const { 
        cartItems,
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        getCartItemCount,
        getCartTotal,
        clearCart,
    } = useCart();

    const isInCart = (productId, size) => {
        return cartItems.some(item => item.id === productId && item.size === size);
    };

    const getItemQuantity = (productId, size) => {
        const item = cartItems.find(item => item.id === productId && item.size === size);
        return item ? item.quantity : 0;
    };

    const getCartItems = (productId, size) => {
        return cartItems.find(item => item.id === productId && item.size === size);
    };

    const addProductToCart = (product) => {
        try {
            if (!product || !product.id) {
                throw new Error('Product must have id');
            }
            if (!product.size) {
                throw new Error('Product size is required');
            }

            const quantity = product.quantity || 1;
            if (quantity <= 0) {
                throw new Error('Quantity must be at least 0');
            }

            addToCart(product);
            return { success: true, message: 'Product added to cart' };
        } catch (error) {
            console.error('Error adding product to cart:', error);
            return { success: false, message: error.message };
        }
    };

    const removeProductFromCart = (productId, size) => {
        try {
            if (!productId || !size) {
                throw new Error('Product ID and size are required');
            }
            removeFromCart(productId, size);
            return { success: true, message: 'Product removed from cart' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const increaseProductQuantity = (productId, size) => {
        try {
            updateQuantity(productId, size, 1);
            return { success: true, message: 'Product quantity increased' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const decreaseProductQuantity = (productId, size) => {
        try {
            const currentItem = getCartItems(productId, size);
            if (!currentItem || currentItem.quantity <= 1) {
                removeFromCart(productId, size);
                return { success: true, message: 'Product quantity decreased' };
            } else {
                updateQuantity(productId, size, -1);
                return { success: true, message: 'Product quantity decreased' };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const setItemQuantity = (productId, size, quantity) => {
        try {
            if (quantity <= 0) {
                removeFromCart(productId, size);
                return { success: true, message: 'Product removed from cart' };
            }

            const currentItem = getCartItems(productId, size);
            if (!currentItem) {
                const change = quantity - currentItem.quantity;
                updateQuantity(productId, size, change);
                return { success: true, message: 'Product quantity updated' };
            } 
            return { success: true, message: 'Product quantity updated' };

        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const emptyCart = () => {
        try {
            clearCart();
            return { success: true, message: 'Cart emptied successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const getFormattedTotal = () => {
        const total = getCartTotal();
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(total);
    };

    const getFormattedPrice = (price) => {
        const numericPrice = typeof price === 'string' 
            ? parseFloat(price.replace(/[^\d.-]/g, '')) 
            : price;
        return new Intl.NumberFormat('en-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(numericPrice || 0);
    };

    const isEmpty = cartItems.length === 0;

    const getCartSummary = () => {
        const totalItems = getCartItemCount();
        const totalPrice = getCartTotal();
        return {
            itemCount: totalItems,
            total: totalPrice,
            formattedTotal: getFormattedTotal(),
            items: cartItems,
            itemsCount: cartItems.length,
            isEmpty: isEmpty,
        };
    };

    const getProductSizesInCart = (productId) => {
        return cartItems
            .filter(item => item.id === productId)
            .map(item => ({
                size: item.size,
                quantity: item.quantity,
            }));
    };

    const getTotalQuantityForProduct = (productId) => {
        return cartItems
            .filter(item => item.id === productId)
            .reduce((total, item) => total + item.quantity, 0);
    };

    return {
        //Cart data
        cartItems: cartItems,
        isEmpty,

        //Check functions
        isInCart,
        getItemQuantity,
        getCartItems,
        getProductSizesInCart,
        getTotalQuantityForProduct,

        //modify functions
        addProductToCart,
        removeProductFromCart,
        increaseProductQuantity,
        decreaseProductQuantity,
        setItemQuantity,
        emptyCart,

        //calculation functions
        getCartItemCount,
        getCartTotal,
        getFormattedTotal,
        getFormattedPrice,
        getCartSummary,

        //Original functions
        addToCart,
        updateQuantity,
        removeFromCart,
    };
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}; 
