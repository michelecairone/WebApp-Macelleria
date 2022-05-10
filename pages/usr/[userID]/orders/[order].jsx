import axios from "axios";
import OrderDetail from "../../../../components/OrderDetail";

export default function Orders({ products }) {

    return (
        <>
        <OrderDetail products={products}/>
        </>
    )
        
}

export const getServerSideProps = async ({ params }) => {
    console.log(params);
    const res = await axios.get(`http://localhost:80/api/user/${params.userID}/orders/${params.order}`);

    return {
        props: {
            products: res.data
        },
    };
};