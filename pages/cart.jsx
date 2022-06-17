import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import LogMenu from "../components/LogMenu";
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import { rmvProduct } from "../redux/cartSlice";

const Cart = () => {

  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteProduct = (id) => {
    console.log(id);
    dispatch(rmvProduct(id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Prodotto</th>
              <th>Nome</th>
              <th>Prezzo al Kg</th>
              <th>Quantità</th>
              <th>Totale</th>
              <th>Elimina</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product.id}>
                <td>
                  <div className={styles.imgContainer}>
                    {product.image ?
                      <Image src={`/image/${product.image}`} objectFit="contain" layout="fill" alt="" /> :
                      <Image src={"/image/download.png"} width="300" height="500" />
                    }
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.name}</span>
                </td>
                <td>
                  <span className={styles.price}>{product.price} €</span>
                </td>
                <td>
                  <span className={styles.quantity}>{(parseFloat(product.quantity)).toFixed(3)} kg</span>
                </td>
                <td>
                  <span className={styles.total}>
                    {(product.price * product.quantity).toFixed(2)} €
                  </span>
                </td>
                <td>
                  <span>
                    <Button color="error" onClick={() => deleteProduct(product)}>
                      <ClearIcon />
                    </Button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CARRELLO TOTALE</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Totale parziale:</b>{(cart.total).toFixed(2)} €
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Sconto:</b>0.00 €
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Totale:</b>{(cart.total).toFixed(2)} €
          </div>
          <div className={styles.totalText}>
            <LogMenu cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
