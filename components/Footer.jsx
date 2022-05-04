import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/image/bg.jpg" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            Oltre a dell'ottima carne vi aspettano tanti preparati, venite a trovarci!
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>DOVE TROVARCI</h1>
          <p className={styles.text}>
            Via Generale Domenico Giglio, 33.
            <br /> TRAPANI TP, 91100
            <br /> 0923-547296
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>ORARIO DI APERTURA</h1>
          <p className={styles.text}>
            DAL LUNEDì AL MERCOLEDì
            <br /> 8:30 – 14:00
          </p>
          <p className={styles.text}>
            DAL GIOVEDì AL SABATO
            <br /> 8:30 – 19:30
          </p>
          <p className={styles.text}>
            DOMENICA CHIUSO
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
