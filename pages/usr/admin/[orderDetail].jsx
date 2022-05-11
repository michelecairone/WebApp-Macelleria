import axios from "axios";
import OrderDetail from "../../../components/OrderDetail";
import { useRouter } from "next/router";

export default function orderDetail({ id, products}) {
    
    console.log(products);

    return (
        <>
            <OrderDetail products={products} />
        </>
    )

}

export const getServerSideProps = async ({ params }) => {
   
    const res = await axios.get(`http://localhost:80/api/admin/orders/${params.orderDetail}`);

    return {
        props: {
            products: res.data
        },
    };
};