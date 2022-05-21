import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { reset } from "../redux/userRedux";
import { resetP } from "../redux/cartSlice";

const Navbar = () => {

    const dispatch = useDispatch();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const quantity = useSelector((state) => state.cart.quantity);
    
    const user = useSelector((state) => state.user);
    
    const quit = (event) => {
        handleCloseUserMenu(event);
        dispatch(resetP());
        dispatch(reset());
        window.location.replace("/usr/login");
           
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function refreshPage() {
        window.location.reload();
    }

    function Autenticato() {
        return (
            <>
                <Link href={`/usr/${user.currentUser.id}`} passHref>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Profilo</Typography>
                    </MenuItem>
                </Link>
                <Link href={`/usr/${user.currentUser.id}/orders`} passHref>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Ordini</Typography>
                    </MenuItem>
                </Link>
                <Link href="/usr/login" passHref>
                    <MenuItem onClick={quit}>
                        <Typography textAlign="center">Esci</Typography>
                    </MenuItem>
                </Link>
            </>
        );
    }

    function NonAutenticato() {
        return (
            <>
                <Link href="/usr/login" passHref>
                    <MenuItem onClick={handleCloseUserMenu}>

                        <Typography textAlign="center">Accedi</Typography>

                    </MenuItem>
                </Link>
                <Link href="/usr/register" passHref>
                    <MenuItem onClick={handleCloseUserMenu}>

                        <Typography textAlign="center">Registrati</Typography>

                    </MenuItem>
                </Link>
            </>
        );
    }

    function Admin() {
        return (
            <>
                <Link href={`/usr/${user.currentUser.id}?`} passHref>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Profilo</Typography>
                    </MenuItem>
                </Link>
                <Link href={`/usr/admin/`} passHref>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Ordini</Typography>
                    </MenuItem>
                </Link>
                <Link href={`/usr/admin/products`} passHref>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Prodotti</Typography>
                    </MenuItem>
                </Link>
                <Link href="/usr/login" passHref>
                    <MenuItem onClick={quit}>
                        <Typography textAlign="center">Esci</Typography>
                    </MenuItem>
                </Link>
            </>
        );

    }

    function tab(){

        if (user.currentUser !== null && user.currentUser.admin == true){
            return <Admin />
        } 
        else if (user.currentUser !== null) {
            return <Autenticato />
        } 
        else {
            return <NonAutenticato />
        }
    }


    return (
        
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <Link href={`/`} passHref>
                                <a>
                                <Image src="/image/logo.png" alt="" width="100px" height="100px" />
                                </a>
                            </Link>
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <Link href={`/`} passHref>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">Home</Typography>
                                    </MenuItem>
                                </Link>
                                <Link href="#prodotti" passHref>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">Prodotti</Typography>
                                    </MenuItem>
                                </Link>
                                <Link href="#contatti" passHref>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">Contatti</Typography>
                                    </MenuItem>
                                </Link>
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            <Link href={`/`} passHref>
                                <a>
                                <Image src="/image/logo.png" alt="" width="100px" height="100px" />
                                </a>
                            </Link>
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Link href={`/`} passHref>
                                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    Home
                                </Button>
                            </Link>
                            <Link href="#prodotti" passHref>
                                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    Prodotti
                                </Button>
                            </Link>
                            <Link href="#contatti" passHref>
                                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    Contatti
                                </Button>
                            </Link>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title={user.isFetching ? "Profilo" : "Accedi"}>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <AccountCircleIcon color='secondary' fontSize="large" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {tab()}

                            </Menu>
                            <Link href={`/cart`} passHref>
                                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                    <Badge badgeContent={quantity} color="error">
                                        <ShoppingCartIcon />
                                    </Badge>
                                </IconButton>
                            </Link>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>
 
    );
};
export default Navbar;


