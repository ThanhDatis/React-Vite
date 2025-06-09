import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Breadcrumbs as MuiBreadcrumbs,
    Link,
    Typography,
    styled,
    Container,
    Box
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
  
const BreadcrumbContainer = styled(Box)(({ theme }) => ({
    padding: '12px 0',
}));

// Styled Breadcrumbs component
const StyledBreadcrumbs = styled(MuiBreadcrumbs)(({ theme }) => ({
    '& .MuiBreadcrumbs-separator': {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    '& .MuiBreadcrumbs-li': {
        display: 'flex',
        alignItems: 'center',
    }
}));

// Styled Link component
const BreadcrumbLink = styled(Link)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    textDecoration: 'none',
    color: '#333333',
    fontSize: '16px',
    transition: 'color 0.2s ease-in-out',
    '&:hover': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
    },
    '& .MuiSvgIcon-root': {
        fontSize: '20px',
        marginRight: '2px',
    }
}));

// Styled current page text
const CurrentPage = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: '16px',
}));

const Breadcrumb = ({ items }) => {
    return (
        <BreadcrumbContainer>
            <Container maxWidth="xl" disableGutters>
                <Box sx={{ px: { xs: 2, sm: 3, md: 12.5 } }}>
                    <StyledBreadcrumbs
                        separator={
                            <NavigateNextIcon 
                                fontSize="small" 
                                sx={{ color: 'text.secondary' }}
                            />
                        }
                        aria-label="breadcrumb navigation"
                    >
                        {items.map((item, index) => {
                            // If it's a link (has path)
                            if (item.path) {
                                return (
                                    <BreadcrumbLink
                                        key={index}
                                        component={RouterLink}
                                        to={item.path}
                                        underline="none"
                                    >
                                        {index === 0 && <HomeIcon />}
                                        {item.label}
                                    </BreadcrumbLink>
                                );
                            }
                            
                            // If it's the current page (no path)
                            return (
                                <CurrentPage key={index} variant="body2">
                                    {item.label}
                                </CurrentPage>
                            );
                        })}
                    </StyledBreadcrumbs>
                </Box>
            </Container>
        </BreadcrumbContainer>
    );
};

export default Breadcrumb; 