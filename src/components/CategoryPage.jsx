import React, { useState, useCallback } from "react";
import {
  useTheme,
  Container,
  Box,
  Typography,
  Button,
  styled,
  useMediaQuery,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

import ProductCardItem from "./ProductCardItem/index.jsx";
import Breadcrumb from "./Breadcrumb/Breadcrumb";

const ProductsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(1, 1fr)",
  },
  [theme.breakpoints.between("sm", "md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  [theme.breakpoints.between("md", "lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(4, 1fr)",
  },
}));

const CategoryContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  maxWidth: "100%",
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up("md")]: {
    paddingLeft: theme.spacing(12.5),
    paddingRight: theme.spacing(12.5),
  },
  [theme.breakpoints.up("lg")]: { maxWidth: "1400px", },
}));

const CategoryHeader = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4), fontWeight: 700,
  textTransform: "uppercase", position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    left: 0,
    width: 60,
    height: 3,
    backgroundColor: theme.palette.primary.main,
  },
}));

const PaginationContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(2),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(0.5),
  flexWrap: "wrap",
}));

const PaginationButton = styled(Button)(({ theme, active }) => ({
  borderRadius: theme.spacing(1),
  minWidth: 32, minHeight: 32,
  fontWeight: active ? 600 : 400,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: active
      ? theme.palette.primary.dark
      : theme.palette.primary.light,
    transform: "translateY(-1px)",
    boxShadow: theme.shadows[2],
  },
  "&:disabled": { opacity: 0.5, cursor: "not-allowed", },
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  minWidth: 32, minHeight: 32,
  padding: theme.spacing(0.75),
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[2],
    transform: "translateY(-1px)",
  },
  "&:disabled": { opacity: 0.5, cursor: "not-allowed",
    "&:hover": { boxShadow: "none", transform: "none", },
  },
}));

const calculatePageNumbers = (currentPage, totalPages, maxVisiblePages = 5) => {
  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const half = Math.floor(maxVisiblePages / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, start + maxVisiblePages - 1);

  if (end === totalPages) {
    start = Math.max(1, end - maxVisiblePages + 1);
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const CustomPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isMobile,
}) => {
  // const theme = useTheme();
  const maxVisiblePages = isMobile ? 3 : 5;
  const pageNumbers = calculatePageNumbers(
    currentPage,
    totalPages,
    maxVisiblePages
  );

  const handlePageChange = useCallback(
    (pageNumber) => {
      if (
        pageNumber >= 1 &&
        pageNumber <= totalPages &&
        pageNumber !== currentPage
      ) {
        onPageChange(null, pageNumber);
      }
    },
    [currentPage, totalPages, onPageChange]
  );

  if (totalPages <= 1) return null;

  return (
    <PaginationContainer>
      <Tooltip title="First Page" placement="top">
        <NavigationButton
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          size={isMobile ? "small" : "medium"}
          aria-label="First Page"
        >
          <FirstPage fontSize={isMobile ? "small" : "medium"} />
        </NavigationButton>
      </Tooltip>

      <Tooltip title="Previous Page" placement="top">
        <NavigationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          size={isMobile ? "small" : "medium"}
          aria-label="Previous Page"
        >
          <ChevronLeft fontSize={isMobile ? "small" : "medium"} />
        </NavigationButton>
      </Tooltip>

      {pageNumbers.map((pageNumber) => (
        <PaginationButton
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          variant={pageNumber === currentPage ? "contained" : "outlined"}
          size={isMobile ? "small" : "medium"}
          active={pageNumber === currentPage}
          aria-label={`Page ${pageNumber}`}
          aria-current={pageNumber === currentPage ? "page" : undefined}
        >
          {pageNumber}
        </PaginationButton>
      ))}

      <Tooltip title="Next Page" placement="top">
        <NavigationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          size={isMobile ? "small" : "medium"}
          aria-label="Next Page"
        >
          <ChevronRight fontSize={isMobile ? "small" : "medium"} />
        </NavigationButton>
      </Tooltip>

      <Tooltip title="Last Page" placement="top">
        <NavigationButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          size={isMobile ? "small" : "medium"}
          aria-label="Last Page"
        >
          <LastPage fontSize={isMobile ? "small" : "medium"} />
        </NavigationButton>
      </Tooltip>
    </PaginationContainer>
  );
};

export default function CategoryPage({
  categoryName,
  products = [],
  productsPerPage = 16,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentPage, setCurrentPage] = useState(1);

  const [isChangingPage, setIsChangingPage] = useState(false);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice( indexOfFirstProduct, indexOfLastProduct );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = useCallback((event, pageNumber) => {
    setIsChangingPage(true);
    setCurrentPage(pageNumber);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsChangingPage(false);
    }, 300);
  }, []);

  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: categoryName },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <CategoryContainer>
        <CategoryHeader variant={isMobile ? "h5" : "h4"} component="h1">
          {categoryName}
        </CategoryHeader>

        <Box sx={{ transition: "opacity 0.4s ease", opacity: isChangingPage ? 0.6 : 1, }} >
          <ProductsGrid>
            {currentProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
              >
                <ProductCardItem product={product} />
              </Box>
            ))}
          </ProductsGrid>
        </Box>
        {/* {totalPages > 1 && (
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
                )} */}
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isMobile={isMobile}
        />
      </CategoryContainer>
    </>
  );
}
