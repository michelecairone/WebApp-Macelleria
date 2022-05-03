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

let stringFilter='';

export default function Home({ productList, user }) {

  const [close, setClose] = useState(true);
  const [filter, setFilter] = useState({
    Bianca: false,
    Rossa: false,
    Preparati: false,
  });

  function handleSubmit(){
    stringFilter = '';

    if (filter.Bianca === true){
      stringFilter += 'Carne bianca,';
    }
    if (filter.Rossa === true){
      stringFilter += 'Carne rossa,';
    }
    if (filter.Preparati === true){
      stringFilter += 'Preparati';
    }
    console.log(stringFilter);
    //getServerSideProps();

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
    <Box sx={{ display: 'flex' }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <FormLabel component="legend">Filtri</FormLabel>
        <FormGroup>
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
     
      <a name="prodotti">
        <ProductList productList={productList} user={user}/>
      </a>
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async () => {
  let req = '';
  if (stringFilter !== '') req = `http://localhost:80/api/products/category/${stringFilter}`;
  else req ='http://localhost:80/api/products/';



  const res = await axios.get(req);
  return {
    props: {
      productList: res.data

    },
  };
};
