import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import CategoryPage from '../CategoryPage';
import { categories } from '../../data/productData';

const CategoryFactory = () => {
  const { categoryId } = useParams();
  
  // Find the category by path
  const category = categories.find(cat => cat.path === categoryId);
  
  // If category doesn't exist, redirect to home
  if (!category) {
    return <Navigate to="/" />;
  }
  
  return (
    <CategoryPage 
      categoryName={category.name}
      categoryPath={category.path}
      products={category.products}
    />
  );
};

export default CategoryFactory; 