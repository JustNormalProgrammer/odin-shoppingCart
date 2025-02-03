import LogoImg from "../../assets/logo-svgrepo-com.svg";
import styles from "./Logo.module.css";
import { Link } from "react-router";
export default function Logo() {
  return (
    <div className={styles.logoGroup}>
      <Link to={"/"}>
        <img src={LogoImg} className={styles.logo} alt="Logo" />
        <div className={styles.logoText}>ReactShop</div>
      </Link>
    </div>
  );
}
