import axios from "axios";
import OrderDetail from "../../../components/OrderDetail";

export default function orderDetail({ products }) {
    
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