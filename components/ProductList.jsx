import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";


export default function ProductList() {

  const [prodotti, setProdotti] = useState([]);
  useEffect(() => {
    getProdotti();
  }, []);

  function getProdotti() {
    axios.get('http://localhost:80/api/products/').then(function(response) {
      console.log(response.data);
      setProdotti(response.data);
      
    });
  }

  return (
    <div className={ styles.container }>
      <h1 className={ styles.title }>LA MIGLIOR MACELLERIA DI PACECO</h1>
      <p className={ styles.desc }>
        Da più di 30 anni ci impegniamo quotidianamente selezionando le migliori carni per portarle nelle vostre cucine.
        Da DOMANI 5 Aprile saremo APERTI!!
        Ci troverete dalle ore 8 alle ore 14 e dalle 17 alle 20!!
        Volevamo ringraziare tutti coloro che si sono preoccupati per la nostra salute in questi giorni ma non vedevamo l’ora di fare questo annuncio.
        Vi aspettiamo super carichi pronti per preparare insieme succulenti manicaretti! 🥩🍗😋
      </p>
      <div className={ styles.wrapper }>
        {prodotti.map((product, key) => (
          <ProductCard key={ product.id } product={ product } />
        ))}
      </div>
    </div>
  );
};


