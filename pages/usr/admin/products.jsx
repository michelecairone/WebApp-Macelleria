import axios from "axios";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import 'reactjs-popup/dist/index.css';
import styles from "../../../styles/Admin.module.css";
import AddProduct from "../../../components/AddProduct";
import UpdateProduct from "../../../components/UpdateProduct";


export default function products({ products }) {

    const [productList, setProductList] = useState(products);
   
    const handleDelete = async (id) => {

        try {
            await axios.delete("http://localhost:80/api/products/" + id);
            setProductList(productList.filter((product) => product._id !== id));
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className={styles.container}>

                <div className={styles.item}>
                    <h1 className={styles.title}>Prodotti </h1>
                    <AddProduct />
                    <table className={styles.table}>
                        <tbody>
                            <tr className={styles.trTitle}>
                                <th>Immagine</th>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Descrizione</th>
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
                                    <td>{product.description}</td>
                                    <td>{product.price}€</td>
                                    <td>
                                        <UpdateProduct product={product} />
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
                </div>
            </div>
        </>
    );
};

export const getServerSideProps = async () => {
   
    const productRes = await axios.get("http://localhost:80/api/products");
    
    return {
        props: {
            
            products: productRes.data,
        },
    };
};