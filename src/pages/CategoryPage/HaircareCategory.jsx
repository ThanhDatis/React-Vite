import React from 'react';
import CategoryPage from '../../components/CategoryPage';
import { categories } from '../../data/productData';

const HaircareCategory = () => {
  const category = categories.find(cat => cat.id === 'haircare');
  
  return (
    <CategoryPage 
      categoryName={category.name}
      categoryPath={category.path}
      products={category.products}
    />
  );
};

export default HaircareCategory; 