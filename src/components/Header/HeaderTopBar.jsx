import HeaderMenuIcons from './HeaderMenuIcons'
import { AppBar, Toolbar, Typography, InputBase, IconButton, Box, Container } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  padding: '0 !important',
  minHeight: '64px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
}));

export default function HeaderTopBar() {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="xl">
        <StyledToolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: { xs: 'none', sm: 'block' },
              fontSize: '20px',
              fontWeight: 'bold',
              paddingRight: '70px',
              paddingLeft: '70px'
            }}
          >
            YOUR LOGO
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          
          <HeaderMenuIcons />
        </StyledToolbar>
      </Container>
    </AppBar>
  );
} 