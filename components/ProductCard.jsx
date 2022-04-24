import Image from "next/image";
import styles from "../styles/ProductCard.module.css";
import Link from "next/link";
import AddCart from "./AddButton";

const ProductCard = ({ prodotto }) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${prodotto.id}`} passHref>
        
        <Image src={prodotto.image} alt="" width="500" height="500" />
      </Link>
      <h1 className={styles.title}>{prodotto.name}</h1>
      <span className={styles.price}>€ {prodotto.price} al kg</span>
      <p className={styles.desc}>{prodotto.description}</p>
      <AddCart/>
    </div>
  );
};

export default ProductCard;
