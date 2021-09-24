import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { useAPI } from '../context/ProvedorProducts'
import Router from 'next/router';

import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import HomeIcon from '@mui/icons-material/Home';
export default function PrimarySearchAppBar({ cart, type }) {

    //sumamos los productos
    var suma = 0
    cart.forEach(function (elemento, indice) {
        suma += elemento["quantity"];
    });

    const { products, isLoading } = useAPI();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


    //Manipulación navbar Materiaul UI
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };


    const menuId = 'primary-search-account-menu';
    //Profile Options
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    // prop material-Ui
    const mobileMenuId = 'primary-search-account-menu-mobile';

    //Renderizamos el product para no repetir codigo
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem    onClick={() => { Router.push('/') }}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    
                        <HomeIcon />
                </IconButton>
                <span>Inicio</span>
            </MenuItem>
            <MenuItem onClick={() => Router.push('/cart')}>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={suma} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <span>Carrito</span>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <span>Profile</span>
            </MenuItem>
        </Menu>
    );
    //Remover deplicados de las categorias existentes
    const removeDuplicates = () => {
        var newArray = [];
        var lookupObject = {};

        for (var i in products) {
            lookupObject[products[i]["category"]] = products[i];
        }

        for (i in lookupObject) {
            newArray.push(lookupObject[i]);
        }
        return newArray;
    }
    //Guardamos la categoria
    const [categoryavailable, setCategory] = React.useState('');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    //Llamamos el const
    var CategoriasUnicas = removeDuplicates();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        onClick={() => { Router.push('/') }}
                    >
                        Fake Shop
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {type != 0 ?
                            <FormControl sx={{ m: 1, minWidth: 120, marginRight: "2em" }}>

                                <Select style={{ color: "white" }}
                                    value={categoryavailable}
                                    onChange={handleChange}
                                    displayEmpty
                                    variant="standard"
                                    margin="normal"
                                    color="info"

                                    inputProps={{ 'aria-label': 'Categorias' }}
                                >
                                    <MenuItem value="" onClick={() => { Router.push('/') }}>
                                        Todas
                                    </MenuItem>
                                    {CategoriasUnicas.map(product => (

                                        <MenuItem value={product.id} key={product.id} onClick={e => Router.push('/[category]', `/${(product.category).replace(/ /g, "_")}`)}>{product.category}</MenuItem>
                                    ))
                                    }
                                </Select>
                                <FormHelperText style={{ color: "white" }}>Categoria</FormHelperText>
                            </FormControl>
                            : <></>}
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={suma} color="error" onClick={() => Router.push('/cart')}>
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}