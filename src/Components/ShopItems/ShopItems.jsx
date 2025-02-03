import styles from "./ShopItems.module.css";
import CartIcon from "../../assets/cart-plus-svgrepo-com.svg";
import MinusIcon from "../../assets/minus-svgrepo-com.svg";
import PlusIcon from "../../assets/plus-large-svgrepo-com.svg";
import PropTypes from "prop-types";
import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";

const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#8962f3",
  inactiveFillColor: "#2f293a",
};

function ShopItem({ title, price, image, rating }) {
  const [Qty, setQty] = useState(1);
  function addItem() {
    setQty((e) => e + 1);
  }
  function subtractItem() {
    if (Qty <= 1) {
      return;
    }
    setQty((e) => e - 1);
  }
  function onInputChange(e) {
    const number = Number(e.target.value);
    if (Number.isNaN(number) || !Number.isInteger(number) || number < 0) {
      return;
    } else {
      setQty(number);
    }
  }
  function onAddToCart() {
    setQty(1);
  }
  return (
    <div className={styles.shopItem}>
      <img src={image} alt={title} />
      <div className={styles.itemTitle}>{title}</div>
      <Rating
        readOnly
        value={rating.rate}
        itemStyles={myStyles}
        style={{ maxWidth: 110 }}
      />
      <div className={styles.infoGroupWrapper}>
        <div className={styles.price}>{price}$</div>
        <div className={styles.selectQty}>
          <img
            src={MinusIcon}
            className={Qty <= 1 ? styles.disabled : ""}
            onClick={subtractItem}
            alt="Delete item"
          />
          <input
            type="text"
            inputMode="numeric"
            min={0}
            onChange={onInputChange}
            value={Qty}
          />
          <img src={PlusIcon} onClick={addItem} alt="Add item" />
        </div>
        <img src={CartIcon} onClick={onAddToCart} alt="Add to cart" />
      </div>
    </div>
  );
}

ShopItem.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.exact({
    rate: PropTypes.number,
    count: PropTypes.number,
  }),
};

export default function ShopItems() {
  return (
    <div className={styles.shopContainer}>
      <ShopItem
        title="Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
        price={109.95}
        image="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
        rating={{ rate: 3.9, count: 120 }}
      />
    </div>
  );
}
