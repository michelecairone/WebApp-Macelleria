import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter} from "next/router";
import Add from "../components/Add";
import AddButton from "../components/AddButton";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";
import styles from "../styles/Home.module.css";

export default function Home({ productList, user }) {
  
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
        <ProductList productList={productList} user={user}/>
      </a>
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async () => {

  const res = await axios.get('http://localhost:80/api/products/');
  return {
    props: {
      productList: res.data

    },
  };
};
