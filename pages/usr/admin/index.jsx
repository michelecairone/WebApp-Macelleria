import axios from "axios";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import styles from "../../../styles/Admin.module.css";
import style from "../../../styles/Add.module.css";
import { useRouter } from "next/router";
import Add from "../../../components/Add";
import AddButton from "../../../components/Add";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddProduct from "../../../components/AddProduct";
import UpdateProduct from "../../../components/UpdateProduct";
import Link from "next/link";
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b7903c',
      contrastText: '#fff',
    },
  },
})

export default function Index({ orders }) {

  const [orderList, setOrderList] = useState(orders);
  const status = ["in preparazione", "per strada", "in consegna"];

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
    <>
      <div className={styles.container}>
        <div className={styles.item}>
          <ThemeProvider theme={theme}>
            <Link href={`/usr/admin/products`} passHref>
              <Button  variant="outlined" size="small" >
                Visualizza prodotti
              </Button>
            </Link>
          </ThemeProvider>
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
    </>
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


  const orderRes = await axios.get("http://localhost:80/api/admin/orders");

  return {
    props: {
      orders: orderRes.data,
    },
  };
};


