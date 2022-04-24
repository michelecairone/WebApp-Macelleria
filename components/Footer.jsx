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
          <h1 className={styles.title}>FIND OUR BUTCHER'S SHOP</h1>
          <p className={styles.text}>
            Via Generale Domenico Giglio, 33.
            <br /> TRAPANI TP, 91100
            <br /> 0923547296
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 8:00 – 20:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 8:00 – 14:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
