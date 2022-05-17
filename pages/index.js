import axios from "axios";
import Head from "next/head";
import { useState} from "react";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";
import styles from "../styles/Home.module.css";
import Description from "../components/Description";
import Filter from "../components/Filter";

export default function Home({ productList, user }) {

  const [list, setList] = useState([]);
  const [count, setCount] = useState(true);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Macelleria Minaudo</title>
        <meta name="description" content="La miglior macelleria di Paceco" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <Description />
      <Filter setCount={setCount} setList={setList}/>
      <a name="prodotti" id ="product">
        <ProductList productList={count ? productList : list} />
      </a>
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
