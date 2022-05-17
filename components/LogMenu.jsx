import React from 'react';
import styles from "../styles/Product.module.css";
import style from "../styles/Cart.module.css";
import Link from "next/link";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch, useSelector } from "react-redux";
import {
    PayPalScriptProvider,
    
} from "@paypal/react-paypal-js";
import ButtonWrapper from "../components/ButtonWrapper";

export default function LogMenu({ cart }) {

    const { isFetching, error } = useSelector((state) => state.user);
    let user_id = 0;

    if (isFetching) {

        user_id = useSelector((state) => state.user.currentUser.id);
    }

    if (isFetching) {
        return (
            <div>
                <PayPalScriptProvider
                    options={{
                        "client-id":
                            "ARmEM0i9u-hUpQmPdKneDeQl__0co-SN56SFM4tnIT4SLT4Nt9VApTJoRS-XM-gkBM08e5uFNTkRbhag",
                        components: "buttons",
                        currency: "EUR",
                        "disable-funding": "credit,card,p24,sofort,mybank"
                    }}
                >
                    <ButtonWrapper cart={cart} user_id={user_id} />
                </PayPalScriptProvider>
            </div>
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

