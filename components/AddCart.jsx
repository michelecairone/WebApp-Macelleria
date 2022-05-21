import styles from "../styles/Product.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function AddCart({ product }) {

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

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

      <Button type="submit" onClick={handleClick}
        fullWidth
        variant="outlined"
        size="small"
        sx={{ mt: 3, mb: 2 }}>Aggiungi al carrello</Button>


      <br />

    </div>
  );

};


