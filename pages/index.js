import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Macelleria Minaudo</title>
        <meta name="description" content="La miglior macelleria di Paceco" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {<AddButton setClose={setClose} />}
      <a name="prodotti">
      <ProductList/>
      </a>
      {!close && <Add setClose={setClose} />}
    </div>
  );
}



/*
async function getProdotti() {

  const res = await axios.get('http://localhost:80/api/');

  const data = res.data;
  console.log(typeof(data))
  console.log(`prodotti: ${data}`)

}
getProdotti();



export const getServerSideProps = async () => {

const config = {
  method: 'get',
  url: 'http://localhost:80/'
}
const res = await axios(config);
const prodotti = res.data;
console.log(prodotti)

  return {
    props: {
    prodotti
    },
  };
}; */
