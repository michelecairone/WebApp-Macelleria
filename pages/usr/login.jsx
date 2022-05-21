import { useRouter } from "next/router";
import { useState } from "react";
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
import { loginR } from "../../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";



const Login = () => {

  const router = useRouter();
  const [inputs, setInputs] = useState([]);
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);


  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  const handleSubmit = async (event) => {

    event.preventDefault();
    let vrf = await loginR(dispatch, inputs);
    if (vrf) {
      router.push("/");
    }
    console.log(vrf);

  };

  return (

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
          {error && <span className={styles.error}>Email o password errate!</span>}
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

  );
};

export default Login;
