import React from 'react';
import 'reactjs-popup/dist/index.css';
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { resetP } from "../redux/cartSlice";

// Custom component to wrap the PayPalButtons and handle currency changes
export default function ButtonWrapper({ showSpinner, cart, user_id }) {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const style = { layout: "vertical" };
    const currency = "EUR";
    const router = useRouter();
    const dispatch2 = useDispatch();

    let inputs = ({
        id_client: parseInt(user_id),
        cart_total: cart.total,
        products: cart.products,
    });

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    const createOrder = async () => {

        try {
            const res = await axios.post('http://localhost:80/api/products/order', inputs);
            if (res.status === 200) {
                dispatch2(resetP());
                router.push(`usr/${user_id}/orders/${res.data.id_order}/`);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (

        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[(cart.total).toFixed(2), currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: (cart.total).toFixed(2),
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





