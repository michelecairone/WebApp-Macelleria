import Image from "next/image";
import styles from "../styles/ProductCard.module.css";
import Link from "next/link";
import AddCart from "./AddCart";
import Typography from '@mui/material/Typography';

const ProductCard = ({ product, user }) => {

  return (
    <div className={styles.container} >
      <Link href={`/product/${product.id}/}` } passHref>
        <div>
      
          <Image src={ `/image/${product.image}` } alt="" width="500" height="500" />
          
          <Typography variant="h6" gutterBottom>{ product.name }</Typography>
          <Typography variant="overline" display="block" gutterBottom>€ { product.price } al kg</Typography>
          <Typography variant="caption" display="block" gutterBottom>Dettagli v</Typography>
        </div>
      </Link>
      <AddCart product={ product }/>
      
    </div>
  );
};

export default ProductCard;
