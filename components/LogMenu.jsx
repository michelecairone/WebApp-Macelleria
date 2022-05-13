import React from 'react';
import styles from "../styles/Product.module.css";
import style from "../styles/Cart.module.css";
import Link from "next/link";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { reset } from "../redux/cartSlice";

export default function LogMenu({ user, cart }) {

    const router = useRouter();
    const dispatch = useDispatch();
    const amount = cart.total;
    const currency = "EUR";
    const [logged, setLogged] = useState(null);
    const [inputs, setInputs] = useState({
        
            id_client: parseInt(user.usr),
            cart_total: cart.total,
            products: cart.products,
    });

    
    const createOrder = async () => {
       
        try {
            const res = await axios.post('http://localhost:80/api/products/order', inputs);
            if (res.status === 200) {
                dispatch(reset());
                router.push(`usr/${user.usr}/orders/${res.data.id_order}/?usr=${user.usr}`);
            }
        } catch (err) {
            console.log(err);
        }
    }
   
    const verifyUser = async () => {
        const id_user = (parseInt(user.usr));
      
        if (id_user > 0) {
            setLogged(true);
        }
        else {
            setLogged(false);
        }
        console.log("funzione di verifica");

    }

    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);

        return (
            <>
                {(showSpinner && isPending) && <div className="spinner" />}
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order

                                return orderId;
                            });
                    }}
                    onApprove={function () {
                        createOrder();
                        
                    }}
                />
            </>
        );
    };

    if (logged == null) { 
        return (
        <button onClick={() => verifyUser()} className={style.button}>
                Effettua Ordine!
        </button>)
} 
    else if (logged) {
        return (
            <>
                <div className={style.right}>
                    <PayPalScriptProvider
                        options={{
                            "client-id":
                                "ARmEM0i9u-hUpQmPdKneDeQl__0co-SN56SFM4tnIT4SLT4Nt9VApTJoRS-XM-gkBM08e5uFNTkRbhag",
                            components: "buttons",
                            currency: "eur",
                            "disable-funding": "credit,card,p24,sofort,mybank",
                        }}
                    >
                        <ButtonWrapper currency={currency} showSpinner={false}/>
                    </PayPalScriptProvider>
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

