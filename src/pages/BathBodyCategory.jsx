import React from 'react';
import CategoryPage from '../components/CategoryPage';
import { categories } from '../data/productData';

const BathBodyCategory = () => {
  const category = categories.find(cat => cat.id === 'bathAndBody');
  
  return (
    <CategoryPage 
      categoryName={category.name}
      categoryPath={category.path}
      products={category.products}
    />
  );
};

export default BathBodyCategory; 