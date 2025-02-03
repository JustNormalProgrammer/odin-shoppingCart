import { NavLink } from "react-router";
import Logo from "../Logo/Logo";
import styles from "./Navbar.module.css";
import CartIcon from "../../assets/cart-shopping-svgrepo-com.svg";

function CartLogo() {
  return (
    <div className={styles.cartLink}>
      <img className={styles.cart} src={CartIcon} />{" "}
      <div className={styles.cartQty}>9</div>
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Logo></Logo>
      <ul>
        <li>
          <NavLink className={styles.link} to={"/"} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to={"/shop"} end>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to={"/shop/cart"} end>
            <CartLogo />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
