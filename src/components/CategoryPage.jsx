import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCardItem from './ProductCardItem/index.jsx'
import '../assets/styles/CategoryPage.css'

const pageCalculators = {
    default: (i) => i + 1,
    early: (i) => i + 1,
    late: (i, totalPages) => totalPages - 4 + i,
    middle: (i, currentPage) => currentPage - 2 + i
};

const getPageMode = (currentPage, totalPages) => {
    if (totalPages <= 5) return 'default';
    if (currentPage <= 3) return 'early';
    if (currentPage >= totalPages - 2) return 'late';
    return 'middle';
};

export default function CategoryPage({ 
  categoryName, 
  categoryPath,
  products = [], 
  productsPerPage = 16 
}) {
    const [currentPage, setCurrentPage] = useState(1);
    
    // Tính toán các sản phẩm hiển thị cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    
    // Tính tổng số trang
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Xử lý khi chuyển trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <div className="category-container">
            <div className="breadcumb">
                <Link to="/">Home</Link>
                <svg className="breadcumb-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_2_19729)">
                        <path d="M24 0H0V24H24V0Z" fill="white" fillOpacity="0.01"/>
                        <path d="M9.5 6L15.5 12L9.5 18" stroke="#333333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_2_19729">
                            <rect width="24" height="24" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
                <Link to={`/${categoryPath}`}>{categoryName}</Link>
            </div>
            
            <div className="category-header">
                <h1>{categoryName.toUpperCase()}</h1>
            </div>
            
            <div className="products-grid">
                {currentProducts.map((product) => (
                    <ProductCardItem key={product.id} product={product} />
                ))}
            </div>
            
            <div className="pagination">
                <button 
                    className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const mode = getPageMode(currentPage, totalPages);
                    const calculator = pageCalculators[mode];
                    const pageToShow = mode === 'late' 
                        ? calculator(i, totalPages)
                        : mode === 'middle'
                            ? calculator(i, currentPage)
                            : calculator(i);
                    
                    return (
                        <button
                            key={pageToShow}
                            className={`pagination-number ${currentPage === pageToShow ? 'active' : ''}`}
                            onClick={() => handlePageChange(pageToShow)}
                        >
                            {pageToShow}
                        </button>
                    );
                })}
                
                <button 
                    className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        </div>
    )
} 