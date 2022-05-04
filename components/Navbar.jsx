import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

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
import NotificationsIcon from '@mui/icons-material/Notifications';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#d40000',
        },
        secondary: {
            main: '#fff',
        },
        error: {
            main: '#ef5350',
            contrastText: '#fff',
        },
    },
});

const pages = { Home: '/', Prodotti: '/#prodotti', Contatti: '/#contatti' };
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


const Navbar = ({ user }) => {

    const quantity = useSelector((state) => state.cart.quantity);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

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

    function Autenticato() {
        return (
            <>
                <Link href={`/usr/${user.usr}`} passHref>
                    <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Profilo</Typography>
                    </MenuItem>
                </Link>
                <Link href="/usr/login" passHref>
                    <MenuItem onClick={handleCloseUserMenu}>
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


    return (
        <ThemeProvider theme={theme}>
            <AppBar position="sticky">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            <Link href={`/?usr=${user.usr}`} passHref>
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
                                <Link href={`/?usr=${user.usr}`} passHref>
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
                            <Link href={`/?usr=${user.usr}`} passHref>
                                <a>
                                <Image src="/image/logo.png" alt="" width="100px" height="100px" />
                                </a>
                            </Link>
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Link href={`/?usr=${user.usr}`} passHref>
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
                            <Tooltip title={Number.isInteger(parseInt(user.usr)) ? "Profilo" : "Accedi"}>
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
                                {Number.isInteger(parseInt(user.usr)) ? <Autenticato /> : <NonAutenticato />}

                            </Menu>
                            <Link href={`/cart?usr=${user.usr}`} passHref>
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
        </ThemeProvider >
    );
};
export default Navbar;


