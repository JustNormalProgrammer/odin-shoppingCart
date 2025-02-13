import styles from "./ShopItems.module.css";
import CartIcon from "../../assets/cart-plus-svgrepo-com.svg";
import PropTypes from "prop-types";
import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState, useContext } from "react";
import { CartSetContext } from "../../Contexts/CartContext";
import useShopItems from "../../Queries/useShopItems";
import Skeleton from "react-loading-skeleton";
import QuantitiInputSection from "../QuantityInputSection/QuantityInputSection";
import "react-loading-skeleton/dist/skeleton.css";

const ratingStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#8962f3",
  inactiveFillColor: "#2f293a",
};

function ShopItem({ id, title, price, image, rating }) {
  const setCart = useContext(CartSetContext);
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
    setCart((prev) => {
      const arr = [];
      let isFound = false;
      if (prev.length < 1) {
        arr.push({ title, price, image, qty: Qty });
        return arr;
      }
      for (let i = 0; i < prev.length; i++) {
        if (prev[i].id === id && !isFound) {
          isFound = true;
          arr.push({ ...prev[i], qty: prev[i].qty + Qty });
        } else {
          arr.push({ ...prev[i] });
        }
      }
      if (!isFound) {
        arr.push({ title, price, image, qty: Qty });
      }
      return arr;
    });
    setQty(1);
  }
  return (
    <div className={styles.shopItem}>
      <img src={image} alt={title} className={styles.image} />
      <div className={styles.itemTitle}>{title}</div>
      <Rating
        readOnly
        value={rating.rate}
        itemStyles={ratingStyles}
        style={{ maxWidth: 110 }}
      />
      <div className={styles.infoGroupWrapper}>
        <div className={styles.price}>{price}$</div>
        <QuantitiInputSection
          subtractItem={subtractItem}
          onInputChange={onInputChange}
          addItem={addItem}
          currentQty={Qty}
        />
        <img
          src={CartIcon}
          className={styles.cartIcon}
          onClick={onAddToCart}
          alt="Add to cart"
        />
      </div>
    </div>
  );
}

ShopItem.propTypes = {
  id: PropTypes.number,
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

function SkeletonCard() {
  return (
    <div className={styles.shopItem}>
      <Skeleton
        height={150}
        width={220}
        baseColor="#2f293a"
        highlightColor="#a190fa"
      />
      <Skeleton
        width={220}
        height={60}
        baseColor="#2f293a"
        highlightColor="#a190fa"
      />
      <Skeleton
        width={220}
        height={40}
        baseColor="#2f293a"
        highlightColor="#a190fa"
      />
      <Skeleton
        width={220}
        height={60}
        baseColor="#2f293a"
        highlightColor="#a190fa"
      />
    </div>
  );
}
function SkeletonSection({ count = 10 }) {
  const skeletonArr = [];
  for (let i = 0; i < count; i++) {
    skeletonArr.push(<SkeletonCard key={i} />);
  }
  return skeletonArr;
}

export default function ShopItems({ selectedCategory }) {
  const { isPending, error, data } = useShopItems();

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={styles.shopContainer}>
      {isPending ? (
        <SkeletonSection />
      ) : (
        data.map((item) => {
          if (
            selectedCategory === "All" ||
            item.category === selectedCategory
          ) {
            return (
              <ShopItem
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                rating={item.rating}
              />
            );
          }
          return;
        })
      )}
    </div>
  );
}
ShopItems.propTypes = {
  selectedCategory: PropTypes.string,
};
