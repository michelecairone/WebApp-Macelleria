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
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profilo</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Esci</Typography>
                </MenuItem>
            </>
        );
    }

    function NonAutenticato() {
        return (
            <>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Link href="/usr/login" passHref>
                        <Typography textAlign="center">Accedi</Typography>
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                    <Link href="/usr/register" passHref>
                        <Typography textAlign="center">Registrati</Typography>
                    </Link>
                </MenuItem>
            </>
        );
    }

    function Settings() {
        //const utenteAutenticato = props.utenteAutenticato;
        if (user) {
            return <Autenticato />;
        }
        return <NonAutenticato />;
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
                            <Image src="/image/logo.png" alt="" width="100px" height="100px" />
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
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link href="/" passHref>
                                        <Typography textAlign="center">Home</Typography>
                                    </Link>
                                </MenuItem>

                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link href="/#prodotti" passHref>
                                        <Typography textAlign="center">Prodotti</Typography>
                                    </Link>
                                </MenuItem>

                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link href="/#contatti" passHref>
                                        <Typography textAlign="center">Contatti</Typography>
                                    </Link>
                                </MenuItem>


                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            <Image src="/image/logo.png" alt="" width="100px" height="100px" />
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link href="/" passHref>
                                    Home
                                </Link>
                            </Button>
                            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link href="/#prodotti" passHref>
                                    Prodotti
                                </Link>
                            </Button>
                            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                <Link href="/#contatti" passHref>
                                    Contatti
                                </Link>
                            </Button>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
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

                                <Settings />


                            </Menu>
                            <Link href="/cart" passHref>
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
        </ThemeProvider>
    );
};
export default Navbar;


