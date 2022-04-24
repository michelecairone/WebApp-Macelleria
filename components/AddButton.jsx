import styles from "../styles/Add.module.css";

const AddButton = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
      Aggiungi un nuovo prodotto
    </div>
  );
};

export default AddButton;
