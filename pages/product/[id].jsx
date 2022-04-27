import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import { useRouter } from 'next/router';
import { useParams } from "react-router-dom";
import AddCart from "../../components/AddCart";

const Product = () => {

  const router = useRouter();
  console.log("prima di ID");
  const { id } = router.query;

  console.log({id});
  console.log("dopo di id ");

  const [product, setproduct] = useState([]);
 
  useEffect(() => {
    getProduct();
  }, []);

  async function getProduct() {
    console.log("prima di getProduct");
    await axios.get(`http://localhost:80/api/products/${id}`).then(function (response) {
      console.log(response.data);
      setproduct(response.data);
      console.log("dopo di getProduct");
    });
  

  }

  /*const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product.price);
  
  const changePrice = (number) => {
    setPrice(price * number);
  };

  const handleClick = () => {
    dispatch(addProduct({...product,quantity}));
  };*/
 
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          {product.image ?
            <Image src={ `/image/${product.image}` } objectFit="contain" layout="fill" alt="" /> :
            <Image src={"/image/download.png"} width="300" height="500" />
          }
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{product.name}</h1>
        <span className={styles.price}>{product.price} € al Kg</span>
        <p className={styles.desc}>{product.description}</p>
        <br/>
        <br />
        <h3 className={styles.choose}>Scegli la quantità</h3>
        
        <AddCart product={ product }/>
      </div>
    </div>
  );
};

/*export async function getServerSideProps(context) {
  console.log(context.req.headers.referer)
  return {
    props: {
      
    },
  };
};*/
/*export const getServerSideProps = async () => {
  const router = useRouter();
  console.log(router.query);
 
  const res = await axios.get(
    `http://localhost:80/api/`
  );
  
  console.log(res.data)
  return {
    props: {
      product: res.data,
    },
  };
};*/

export default Product;
