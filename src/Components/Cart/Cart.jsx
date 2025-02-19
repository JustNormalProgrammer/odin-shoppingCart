import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartValueContext, CartSetContext } from "../../Contexts/CartContext";
import PropTypes from "prop-types";
import QuantityInputSection from "../QuantityInputSection/QuantityInputSection";

function CartItem({ qty, title, price, image }) {
  const setCartValue = useContext(CartSetContext);
  function onAdd() {
    setCartValue((prev) =>
      prev.map((item) => {
        if (item.title === title) {
          return { ...item, qty: item.qty + 1 };
        } else {
          return { ...item };
        }
      })
    );
  }
  function onChange(e) {
    setCartValue((prev) => {
      const number = Number(e.target.value);
      if (Number.isNaN(number) || !Number.isInteger(number) || number < 0) {
        return prev;
      }
      return prev.map((item) => {
        if (item.title === title) {
          return { ...item, qty: number };
        } else {
          return { ...item };
        }
      });
    });
  }
  function onSubtract(){
    setCartValue((prev) => prev.map(item => {
      if(item.title === title){
        return {...item, qty: item.qty -1}
      } else{
        return {...item}
      }
    }))
  }
  function onDelete(){
    setCartValue(prev => prev.filter(item => item.title !== title))
  }

  let total = Number(qty * price).toFixed(2);
  return (
    <div>
      <div className={styles.cartItem}>
        <div className={styles.mainInfo}>
          <img src={image} alt="Product" className={styles.productImg} />
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.quantitySection}>
          <div className={styles.price}>{price}$</div>
          <QuantityInputSection
            currentQty={qty}
            addItem={onAdd}
            onInputChange={onChange}
            subtractItem={onSubtract}
          />
          <div className={styles.price}>{total}$</div>
          <svg aria-label="Delete"
          onClick={onDelete}
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                stroke="currentcolor"
                strokeWidth="1.32"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>{" "}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
CartItem.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
};

function CartItems() {
  const cartValue = useContext(CartValueContext);
  return (
    <div className={styles.cartItems}>
      {cartValue.map((item) => {
        return (
          <CartItem
            key={item.title}
            qty={item.qty}
            price={item.price}
            title={item.title}
            image={item.image}
          />
        );
      })}
    </div>
  );
}

function CheckoutSection() {
  const cartValue = useContext(CartValueContext);
  let total = 0;
  cartValue.forEach(item => total += item.price * item.qty);
  return (
    <div className={styles.checkoutSection}>
      <div className={styles.checkoutCard}>
        <div className={styles.header}>Checkout</div>
        <div className={styles.totalInfo}>
          <div>Total: </div>
          <div>{total.toFixed(2)}$</div>
        </div>
        <button>Order</button>
      </div>
    </div>
  );
}

export default function Cart() {
  return (
    <div className={styles.container}>
      <CartItems />
      <CheckoutSection />
    </div>
  );
}
