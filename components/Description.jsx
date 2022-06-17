import styles from "../styles/ProductList.module.css";


export default function Description() {

  return (
    <div className={ styles.container }>
      <h1 className={ styles.title }>CARNI FRESCHE</h1>
      <p className={ styles.desc }>
        Da più di 30 anni ci impegniamo quotidianamente selezionando le migliori carni per portarle nelle vostre cucine.
        🥩🍗😋
      </p>
    </div>
  );
};
