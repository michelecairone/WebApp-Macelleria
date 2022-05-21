import styles from "../styles/ProductList.module.css";


export default function Description() {

  return (
    <div className={ styles.container }>
      <h1 className={ styles.title }>CARNI FRESCHE</h1>
      <p className={ styles.desc }>
        Da più di 30 anni ci impegniamo quotidianamente selezionando le migliori carni per portarle nelle vostre cucine.
        Da DOMANI 5 Aprile saremo APERTI!!
        Ci troverete dalle ore 8 alle ore 14 e dalle 17 alle 20!!
        Volevamo ringraziare tutti coloro che si sono preoccupati per la nostra salute in questi giorni ma non vedevamo l’ora di fare questo annuncio.
        Vi aspettiamo super carichi pronti per preparare insieme succulenti manicaretti! 🥩🍗😋
      </p>
    </div>
  );
};
