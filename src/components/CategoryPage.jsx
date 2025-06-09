import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    Pagination,
    styled,
    useTheme,
    useMediaQuery
} from '@mui/material';
import ProductCardItem from './ProductCardItem/index.jsx';
import Breadcrumb from './Breadcrumb/Breadcrumb';

const ProductsGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(1, 1fr)',
    },
    [theme.breakpoints.between('sm', 'md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
    [theme.breakpoints.between('md', 'lg')]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
    },
}));

const CategoryContainer = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(12.5),
        paddingRight: theme.spacing(12.5),
    },
    [theme.breakpoints.up('lg')]: {
        maxWidth: '1400px',
    },
}));

const CategoryHeader = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    fontWeight: 700,
    textTransform: 'uppercase',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        bottom: -8,
        left: 0,
        width: 60,
        height: 3,
        backgroundColor: theme.palette.primary.main,
    },
}));

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
    products = [], 
    productsPerPage = 16 
}) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentPage, setCurrentPage] = useState(1);
    
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    
    const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (event, pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const breadcrumbItems = [
        { label: 'Home', path: '/' },
        { label: categoryName }
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <CategoryContainer>
                <CategoryHeader variant={isMobile ? "h5" : "h4"} component="h1" >
                    {categoryName}
                </CategoryHeader>
                
                <ProductsGrid>
                    {currentProducts.map((product) => (
                        <Box key={product.id}
                            sx={{ transition: 'transform 0.2s ease-in-out', '&:hover': { transform: 'translateY(-4px)' } }}
                        >
                            <ProductCardItem product={product} />
                        </Box>
                    ))}
                </ProductsGrid>
                
                {totalPages > 1 && (
                    <Box sx={{ mt: 6, mb: 2, display: 'flex', justifyContent: 'center',
                            '& .MuiPagination-ul': { gap: 1 }
                        }}
                    >
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            size={isMobile ? "medium" : "large"}
                            showFirstButton
                            showLastButton
                            siblingCount={isMobile ? 0 : 1}
                            boundaryCount={isMobile ? 1 : 2}
                            sx={{
                                '& .MuiPaginationItem-root': { 
                                    borderRadius: 1,
                                    '&.Mui-selected': { fontWeight: 'bold' },
                                    '&:hover': { backgroundColor: 'primary.light' }
                                }
                            }}
                        />
                    </Box>
                )}
            </CategoryContainer>
        </>
    );
} 
