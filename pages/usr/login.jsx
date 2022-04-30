import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
//import Link from "next/link";
import styles from "../../styles/Login.module.css";

import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#b7903c',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
      contrastText: '#fff'
    }

  },
});

const Login = ({user}) => {

  const router = useRouter();
  const [error, setError] = useState(false);
  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:80/api/user/login', inputs).then(function (response) {
      
      if (response.data == false) {
        user.auth = false;
        setError(true);
      }
      else {
        user.id = 1;
        user.auth = true;
        console.log(user);
        const id = response.data.id;
        router.push({
          pathname: '/',
          query: {id},
        })
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              name="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={handleChange}
            />
            {error && <span className={styles.error}>Wrong Credentials!</span>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Accedi
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/usr/register" variant="body2">
                  {"Non hai un account? Registrati"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
};

export default Login;
