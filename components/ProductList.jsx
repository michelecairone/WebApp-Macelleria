import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";

export default function ProductList({ productList }) {

  return (
    <div className={ styles.container }>
      <div className={ styles.wrapper }>
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
