import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";
import styles from "../styles/Home.module.css";
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Description from "../components/Description";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b7903c',
      contrastText: '#fff',
    },
  },
})

export default function Home({ productList, user }) {

  const [list, setList] = useState([]);
  const [count, setCount] = useState(true);
  const [close, setClose] = useState(true);
  const [filter, setFilter] = useState({
    Bianca: false,
    Rossa: false,
    Preparati: false,
  });

  const handleSubmit = (event) => {
    if (filter.Bianca == false && filter.Rossa == false && filter.Preparati == false) {
      setCount(true);
    }
    else {
      setCount(false);
      event.preventDefault();
      axios.post('http://localhost:80/api/products/filter', filter).then(function (response) {

        console.log(response.data);
        setList(response.data);
      });
    }


  }

  const handleChange = (event) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.checked,
    });
  };

  const { Bianca, Rossa, Preparati } = filter;

  return (
    <div className={styles.container}>
      <Head>
        <title>Macelleria Minaudo</title>
        <meta name="description" content="La miglior macelleria di Paceco" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <Description />
      <ThemeProvider theme={theme}>
        <Box sx={{ display: 'flex',flexDirection: 'column', alignItems: 'center',}}>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Filtri di ricerca</FormLabel>
            <FormGroup sx={{flexDirection: 'row'}}>
              <FormControlLabel
                control={
                  <Checkbox checked={Bianca} onChange={handleChange} name="Bianca" />
                }
                label="Bianca"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={Rossa} onChange={handleChange} name="Rossa" />
                }
                label="Rossa"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={Preparati} onChange={handleChange} name="Preparati" />
                }
                label="Preparati"
              />
            </FormGroup>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Applica
            </Button>

          </FormControl>

        </Box>
      </ThemeProvider>
      <a name="prodotti" id ="product">
        <ProductList productList={count ? productList : list} user={user} />
      </a>
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async () => {

  const res = await axios.get('http://localhost:80/api/products/');
  return {
    props: {
      productList: res.data

    },
  };
};
