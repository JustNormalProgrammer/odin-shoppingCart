import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartValueContext, CartSetContext } from "../../Contexts/CartContext";
import PropTypes, { symbol } from "prop-types";
import QuantitiInputSection from "../QuantitiInputSection/QuantitiInputSection";

function CartItem({ title, price, image }) {
  return (
    <div className={styles.cartItem}>
      <div className={styles.mainInfo}>
        <img src={image} alt="Product" className={styles.productImg} />
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.quantitySection}>
        <div className={styles.price}>{price}$</div>
        <QuantitiInputSection />
        <div className={styles.price}>{price}$</div>
      </div>
    </div>
  );
}
CartItem.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

function CartItems() {
  const cart = useContext(CartValueContext);
  return (
    <div className={styles.cartItems}>
      <CartItem
        title="Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
        price={109.95}
        image="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
      />
    </div>
  );
}

function CheckoutSection() {
  return <div className={styles.checkoutSection}>
    <div>
      <div className={styles.header}>
        Checkout
      </div>
    </div>
  </div>;
}

export default function Cart() {
  return (
    <div className={styles.container}>
      <CartItems />
      <CheckoutSection />
    </div>
  );
}
