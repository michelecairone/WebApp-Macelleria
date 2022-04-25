import styles from "../styles/Product.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/cartSlice";
import { useRouter } from 'next/router';

export default function AddCart({ product }) {

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product.price);

  const changePrice = (number) => {
    setPrice(price * number);
  };

  const handleClick = () => {
    dispatch(addProduct({...product,quantity}));
  };


  return (
    <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
            min="1"
          />
              kg
          <p className={styles.desc}>Totale: {product.price * quantity} €</p>  
          <button className={styles.button} onClick={handleClick}>
              Aggiungi al carrello
          </button>
          <br />
          
    </div>
  );
};


