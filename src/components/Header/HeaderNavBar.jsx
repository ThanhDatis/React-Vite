import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    Menu,
    MenuItem,
    Typography,
    Chip
} from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

export default function HeaderNavBar () {
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const brands = [
        'Adidas',
        'Apple',
        'Bose',
        'Canon',
        'Dell',
        'Dyson',
    ];

    const menuButtonsx = {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: '16px',
        padding: '8px',
        textTransform: 'uppercase',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: 0,
            height: '2px',
            backgroundColor: '#333333',
            transform: 'translateX(-50%)',
            transformOrigin: 'center',
            transition: 'width 0.3s ease-in-out',
        },  
        '&:hover::after': {
            width: '80%',
        }
    };

    const allBrandsButtonSx = {
        color: '#333333',
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '8px',
        textTransform: 'uppercase',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
        },        
    };

    return (
        <AppBar 
            position="static"
            sx={{
                backgroundColor: 'white',
                boxShadow: 'none',
                borderBottom: '2px solid #D7D7D7',
                paddingRight: '70px',
                paddingLeft: '70px',
            }}
        >
            <Toolbar 
            sx={{ 
                justifyContent: 'space-between',
                padding: 0,
                minHeight: '40px !important'
            }}>
                {/* Menu chinh */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* ALL BRANDS voi dropdown */}
                    <Box>
                        <Button
                        onClick={handleMenuOpen}
                        endIcon={<ExpandMore 
                            sx={{
                                transition: 'transform 0.3s ease',
                                transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'
                            }}
                        />}
                        sx={allBrandsButtonSx}
                        >
                        ALL BRANDS
                        </Button>
                        <Menu
                        anchorEl={anchorEl}
                        open={isMenuOpen}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'brands-button',
                        }}
                        PaperProps={{
                            sx: {
                                mt: 1,
                                width: 200,
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                            }
                        }}
                        >
                            {brands.map((brand) => (
                                <MenuItem 
                                key={brand} 
                                onClick={handleMenuClose}
                                sx={{
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                        transform: 'translateX(4px)',
                                    }
                                }}
                                >
                                    <Typography variant="body2">
                                        {brand}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* Cac menu items khac */}
                    <Button
                    component={Link}
                    to="/skincare"
                        sx={menuButtonsx}
                    >
                        SKINCARE
                    </Button>
                    <Button
                    component={Link}
                    to="/makeup"
                    sx={menuButtonsx}
                    >
                        MAKE UP
                    </Button>

                    <Button
                    component={Link}
                    to="/haircare"
                    sx={menuButtonsx}
                    >
                        haircare
                    </Button>

                    <Button
                    component={Link}
                    to="/bath-body"
                    sx={menuButtonsx}
                    >
                        bath & body
                    </Button>

                    <Button
                    component={Link}
                    to="/fragrance"
                    sx={menuButtonsx}
                    >
                        beauty supplements
                    </Button>

                    <Button
                    component={Link}
                    to="/promos"
                    sx={menuButtonsx}
                    >   
                        promos
                    </Button>
                </Box>
                {/* Sell with us */}
                <Box>
                    <Chip
                    label="SELL WITH US"
                    sx={{
                        backgroundColor: '#333333',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        '&:hover': {
                            backgroundColor: '#555555'
                        }
                    }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
        
    );
}