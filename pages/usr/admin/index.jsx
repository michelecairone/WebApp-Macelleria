import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../../styles/Admin.module.css";
import style from "../../../styles/Add.module.css";
import { useRouter } from "next/router";
import Add from "../../../components/Add";
import AddButton from "../../../components/Add";

const Index = ({ orders, products }) => {

  const [close, setClose] = useState(true);
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["in preparazione", "per strada", "in consegna"];

  const handleDelete = async (id) => {

    try {
      await axios.delete("http://localhost:80/api/products/" + id);
      setProductList(productList.filter((product) => product._id !== id));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      const res = await axios.put("http://localhost:3000/api/orders/" + id, {
        status: currentStatus + 1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <button onClick={() => setClose(true)} className={style.mainAddButton}>
          Aggiungi un nuovo prodotto
        </button>
        <h1 className={styles.title}>Prodotti </h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Immagine</th>
              <th>Id</th>
              <th>Nome</th>
              <th>Prezzo</th>
              <th>Azione</th>
            </tr>
          </tbody>
          {productList.map((product) => (
            <tbody key={product.id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={`/image/${product.image}`}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                  />
                </td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}€</td>
                <td>
                  <button className={styles.button}>Modifica</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product.id)}
                  >
                    Cancella
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {!close && <Add setClose={setClose} />}
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Ordini</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Cliente</th>
              <th>Totale</th>
              <th>Pagamento</th>
              <th>Stato</th>
              <th>Azione</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order.id_order}>
              <tr className={styles.trTitle}>
                <td>{order.id_order}</td>
                <td>{order.name} {order.surname}</td>
                <td>{order.total}€</td>
                <td>
                  {order.date_ord /*order.method === 0 ? <span>cash</span> : <span>paid</span>*/}
                </td>
                <td>{order.state}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  /*const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }*/

  const productRes = await axios.get("http://localhost:80/api/products");
  const orderRes = await axios.get("http://localhost:80/api/admin/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
