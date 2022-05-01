import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";
import LogMenu from "../components/LogMenu";

const Cart = ({user}) => {
  
  const cart = useSelector((state) => state.cart);
  const [logged, setLogged] = useState(false);
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };
  const dispatch = useDispatch();
  const router = useRouter();

const createOrder = async (data) => {
  try {
    const res = await axios.post("http://localhost:3000/api/orders", data);
    if (res.status === 201) {
      dispatch(reset());
      router.push(`/orders/${res.data._id}`);
    }
  } catch (err) {
    console.log(err);
  }
};

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function (details) {
            const shipping = details.purchase_units[0].shipping;
            createOrder({
              customer: shipping.name.full_name,
              address: shipping.address.address_line_1,
              total: cart.total,
              method: 1,
            });
          });
        }}
      />
    </>
  );
};

return (
  <div className={styles.container}>
    <div className={styles.left}>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.trTitle}>
            <th>Prodotto</th>
            <th>Nome</th>
            <th>Prezzo</th>
            <th>Quantità</th>
            <th>Totale</th>
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
              <td></td>
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
          <LogMenu user={user} cart={cart} />
      </div>
    </div>
    {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
  </div>
);
};

export default Cart;
