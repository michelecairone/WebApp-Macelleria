import styles from "../../styles/Product.module.css";
import Image from "next/image";
import axios from "axios";
import AddCart from "../../components/AddCart";
import Typography from '@mui/material/Typography';

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
      <Typography variant="h2" gutterBottom>{ product.name }</Typography>
        <Typography variant="overline" display="block" gutterBottom>€ { product.price } al kg</Typography>
        <Typography variant="body2" gutterBottom>{product.description}</Typography>
        <br/>
        <br />
        <Typography variant="h6" gutterBottom>Scegli la quantità</Typography>

        
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
