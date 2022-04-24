import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const Add = ({ setClose }) => {
  
  const handleSubmit = (event) => {

    event.preventDefault();

    axios.post('http://localhost:80/api/products/save', inputs).then(function (response) {
      console.log(response.data);
    });

  }
 
  const [inputs, setInputs] = useState([]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h1>Aggiungi un nuovo prodotto</h1>
        <div className={styles.item}>
          <label className={styles.label}>Inserisci il path dell'immagine</label>
          <input 
            type="text" 
            placeholder="/image/nome_della_foto.jpg"
            name="image"
            onChange={ handleChange }
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Nome</label>
          <input
            className={styles.input}
            type="text"
            placeholder="nome"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Descrizione</label>
          <textarea
            rows={4}
            type="text"
            placeholder="Descrizione"
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prezzo</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="prezzo"
              name="price"
              onChange={handleChange}
            /> 
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Quantità disponibile</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="quantità"
              name="amount"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Categoria</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="categoria"
              name="id_category"
              onChange={handleChange}
            />
          </div>
        </div>
        <button className={styles.addButton} onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Add;
