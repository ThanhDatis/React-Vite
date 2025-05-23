import React from 'react';
import CategoryPage from '../components/CategoryPage';
import { categories } from '../data/productData';

const MakeupCategory = () => {
  const category = categories.find(cat => cat.id === 'makeup');
  
  return (
    <CategoryPage 
      categoryName={category.name}
      categoryPath={category.path}
      products={category.products}
    />
  );
};

export default MakeupCategory; 