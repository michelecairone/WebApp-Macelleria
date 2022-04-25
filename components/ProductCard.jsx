import Image from "next/image";
import styles from "../styles/ProductCard.module.css";
import Link from "next/link";
import AddCart from "./AddCart";

const ProductCard = ({ product }) => {
  return (
    <div className={styles.container}>
      <Link href={ `/product/${product.id}` } passHref>
        
        <Image src={ product.image } alt="" width="500" height="500" />
      </Link>
      <h1 className={ styles.title }>{ product.name }</h1>
      <span className={ styles.price }>€ { product.price } al kg</span>
      <p className={ styles.desc }>{ product.description }</p>
      
      <AddCart product={ product }/>
    </div>
  );
};

export default ProductCard;
