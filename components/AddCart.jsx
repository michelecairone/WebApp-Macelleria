import styles from "../styles/Product.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b7903c',
      contrastText: '#fff',
    },
  },
})

export default function AddCart({ product }) {

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product.price);

  const changePrice = (number) => {
    setPrice(price * number);
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity }));
  };


  return (
    <div className={styles.add}>
      <Typography variant="body1" gutterBottom>
        <input
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
          defaultValue={1}
          className={styles.quantity}
          min="1"
        />
        kg</Typography>
      <Typography variant="body1" gutterBottom>Totale: {(product.price * quantity).toFixed(2)} €</Typography>
      <ThemeProvider theme={theme}>
        <Button type="submit" onClick={handleClick}
          fullWidth
          variant="outlined"
          size="small"
          sx={{ mt: 3, mb: 2 }}>Aggiungi al carrello</Button>
      </ThemeProvider>

      <br />

    </div>
  );

  /*return (
    <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
            min="1"
          />
              kg
          <p className={styles.desc}>Totale: {(product.price * quantity).toFixed(2)} €</p>
          
          <button className={styles.button} onClick={handleClick}>
              Aggiungi al carrello
          </button>
          <br />
          
    </div>);*/
};


