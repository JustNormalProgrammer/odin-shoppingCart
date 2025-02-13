import { NavLink } from "react-router";
import Logo from "../Logo/Logo";
import styles from "./Navbar.module.css";
import CartIcon from "../../assets/cart-shopping-svgrepo-com.svg";
import { useContext } from "react";
import { CartValueContext } from "../../Contexts/CartContext";

function CartLogo() {
  const cartValue = useContext(CartValueContext);
  let qty = 0;
  for(let item of cartValue){
      qty += item.qty;
  }
  return (
    <div className={styles.cartLink}>
      <img className={styles.cart} src={CartIcon} />{" "}
      <div className={styles.cartQty}>{qty}</div>
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Logo/>
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
