import Footer from "./Footer";
import Navbar from "./Navbar";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const themeNav = createTheme({
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

const theme = createTheme({
  palette: {
    primary: {
      main: '#b7903c',
      contrastText: '#fff'
    },
  },
});

const Layout = ({ children, user }) => {

  return (
    <>
      <ThemeProvider theme={themeNav}>
        <Navbar user={user} />
      </ThemeProvider>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
      <a name="contatti">
        <Footer />
      </a>
    </>
  );
};

export default Layout;
