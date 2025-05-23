import React from 'react';
import CategoryPage from '../components/CategoryPage';
import { categories } from '../data/productData';

const SkincareCategory = () => {
  const category = categories.find(cat => cat.id === 'skincare');
  
  return (
    <CategoryPage 
      categoryName={category.name}
      categoryPath={category.path}
      products={category.products}
    />
  );
};

export default SkincareCategory; 