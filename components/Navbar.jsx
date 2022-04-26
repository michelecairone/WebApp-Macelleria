import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/image/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDINA ADESSO!</div>
          <div className={styles.text}>0923 547296</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" passHref>
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <a href="/#prodotti">
            <li className={styles.listItem}>Products</li>
          </a>
          <li className={styles.listItem}>Menu</li>
          <Image src="/image/logo.png" alt="" width="100px" height="100px" />
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <a href="/#contatti">
            <li className={styles.listItem}>Contatti</li>
          </a>
        </ul>
      </div>
      <div className={styles.dropup}>
        <div className={styles.dropbtn}>
          <Image src="/image/omino.png" alt="" width="30px" height="30px" />
          <div className={styles.dropup_content}>
            <Link href="/usr/login" passHref>Accedi</Link>
            <Link href="/usr/register" passHref>Registrati</Link>
          </div>
        </div> 
      </div>
      <Link href="/cart" passHref>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src="/image/cart.png" alt="" width="30px" height="30px" />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
