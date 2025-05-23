import React from 'react';
import './ProductCardItem.css';
import ProductCardItemContent from './ProductCardItemContent';
 
export default function ProductCardItem({ product, showCategory = false }) {
    return <ProductCardItemContent product={product} showCategory={showCategory} />;
} 