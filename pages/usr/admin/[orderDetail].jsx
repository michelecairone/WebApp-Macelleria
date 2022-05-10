import axios from "axios";
import OrderDetail from "../../../components/OrderDetail";
import { useRouter } from "next/router";

export default function orderDetail({ id, products}) {
    
    console.log(id);

    return (
        <>
            <OrderDetail products={products} />
        </>
    )

}

export const getServerSideProps = async ({ id, params }) => {
   
    const res = await axios.get(`http://localhost:80/api/user/5/orders/${params.orderDetail}`);

    return {
        props: {
            products: res.data
        },
    };
};