import image from '../assets/images/image.png';

// Helper function to generate products for a category
const generateProducts = (count, category) => {
  return Array(count).fill().map((_, index) => ({
    id: `${category}-${index + 1}`,
    title: "Product Title Goes Here",
    brand: "BRAND",
    oldPrice: "OLD",
    newPrice: "NEW",
    discount: "DISCOUNT",
    category: category,
    image: image
    // Add other properties as needed
  }));
};

export const productData = {
  skincare: generateProducts(48, "skincare"),
  makeup: generateProducts(36, "makeup"),
  haircare: generateProducts(32, "haircare"),
  bathAndBody: generateProducts(24, "bath-body"),
  fragrance: generateProducts(20, "fragrance"),
  // Add more categories as needed
};

export const categories = [
  {
    id: 'skincare',
    name: 'Skincare',
    path: 'skincare',
    products: productData.skincare
  },
  {
    id: 'makeup',
    name: 'Makeup',
    path: 'makeup',
    products: productData.makeup
  },
  {
    id: 'haircare',
    name: 'Haircare',
    path: 'haircare',
    products: productData.haircare
  },
  {
    id: 'bathAndBody',
    name: 'Bath & Body',
    path: 'bath-body',
    products: productData.bathAndBody
  },
  {
    id: 'fragrance',
    name: 'Fragrance',
    path: 'fragrance',
    products: productData.fragrance
  }
  // Add more categories as needed
]; 