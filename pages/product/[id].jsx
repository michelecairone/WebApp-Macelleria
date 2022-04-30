import styles from "../../styles/Product.module.css";
import Image from "next/image";
import axios from "axios";
import AddCart from "../../components/AddCart";

const Product = ({product}) => {
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

export const getServerSideProps = async ({ params }) => {

  const res = await axios.get(`http://localhost:80/api/products/${params.id}`);
  return {
    props: {
      product: res.data
    },
  };
};


export default Product;
