import React from 'react';
import styles from "../styles/Product.module.css";
import style from "../styles/Cart.module.css";
import Link from "next/link";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useEffect, useState } from "react";
import axios from "axios";

export default function LogMenu({ user, cart }) {

    const [logged, setLogged] = useState(null);

    const [inputs, setInputs] = useState({
        id_client: parseInt(user.usr),
            cart_total: cart.total,
            products: cart.products,
    });

    
    const createOrder = async () => {
       
        /*setInputs(({
            id_client: parseInt(user.usr),
            cart_total: cart.total,
            products: cart.products,
            
        }));*/

        const res = await axios.post('http://localhost:80/api/products/order', inputs);{
            console.log(res.data);
          

        };
    }
   
    async function verifyUser() {
        let id_user = (parseInt(user.usr));
        console.log("prima di id_user");
        console.log(id_user);
        console.log("dopo di id_user");

        if (id_user > 0) {
            setLogged(true);
        }
        else {
            setLogged(false);
        }
        console.log("funzione di verifica");

    }

    if (logged == null) { 
        return (<button onClick={() => verifyUser()} className={style.button}>
            CHECKOUT NOW !
        </button>)
} 
    if (logged) {
        return (
            <>
                <div className={style.right}>
                    <button className={style.button} onClick={() => createOrder()}> Effettua Ordine </button>
                </div>
            </>
        )
    }
    else {
        return (
            <>
                <div className={style.right}>
                    <Popup trigger={<button className={style.button}> NON SEI LOGGATO </button>}
                        position="bottom">
                        <p> Per poter effettuare l'ordine bisogna <br />
                            <span className={styles.price}> <Link href="/usr/login" passHref>Accedere</Link></span>
                            <br />
                            o
                            <br />
                            <span className={styles.price}> <Link href="/usr/register" passHref>Registrarsi</Link> </span>
                        </p>
                    </Popup>
                </div>
            </>
        )
    }
};

