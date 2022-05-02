import styles from "../styles/ProductList.module.css";
import ProductCard from "./ProductCard";

export default function ProductList({productList, user}) {

  return (
    <div className={ styles.container }>
      
      <div className={ styles.wrapper }>
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} user={user} />
        ))}
      </div>
    </div>
  );
};
