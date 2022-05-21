import axios from "axios";
import React from "react";
import { useState } from "react";
import styles from "../../../styles/Admin.module.css";
import 'reactjs-popup/dist/index.css';
import Link from "next/link";
import { Button } from "@mui/material";

export default function Index({ orders }) {

  const [orderList, setOrderList] = useState(orders);
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.item}>

          <Link href={`/usr/admin/products`} passHref>
            <Button variant="outlined" size="small" >
              Visualizza prodotti
            </Button>
          </Link>

          <h1 className={styles.title}>Ordini</h1>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Id</th>
                <th>Cliente</th>
                <th>Totale</th>
                <th>Pagamento</th>
                <th>Stato</th>
              </tr>
            </tbody>
            {orderList.map((order) => (
              <tbody key={order.id_order}>
                <tr className={styles.trTitle}>
                  <td>
                    <Link href={`/usr/admin/${order.id_order}?id=${order.id}`} passHref>
                      <Button variant="outlined" size="small" >
                        {order.id_order}
                      </Button>
                    </Link>
                  </td>
                  <td>{order.name} {order.surname}</td>
                  <td>{order.total}€</td>
                  <td>
                    {order.date_ord}
                  </td>
                  <td>{order.state}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {

  const orderRes = await axios.get("http://localhost:80/api/admin/orders");

  return {
    props: {
      orders: orderRes.data,
    },
  };
};


