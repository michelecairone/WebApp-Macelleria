import React from 'react';
import styles from "../styles/Product.module.css";
import style from "../styles/Cart.module.css";
import Link from "next/link";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function LogMenu({ string }) {
    return (
        <div className={style.right}>
            <Popup trigger={<button className={style.button}> {string} </button>}
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
    )
};

