import styles from "./ShopItems.module.css";
import CartIcon from "../../assets/cart-plus-svgrepo-com.svg";
import MinusIcon from "../../assets/minus-svgrepo-com.svg";
import PlusIcon from "../../assets/plus-large-svgrepo-com.svg";
import PropTypes from "prop-types";
import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState, useContext } from "react";
import { CartSetContext } from "../../Contexts/CartContext";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
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
      return [...prev, { id: id, qty: Qty }];
    });
    setQty(1);
  }
  return (
    <div className={styles.shopItem}>
      <img src={image} alt={title} />
      <div className={styles.itemTitle}>{title}</div>
      <Rating
        readOnly
        value={rating.rate}
        itemStyles={ratingStyles}
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
    skeletonArr.push(<SkeletonCard />);
  }
  return skeletonArr;
}

export default function ShopItems({ selectedCategory }) {
  const { isPending, error, data } = useQuery({
    queryKey: ["shopItems"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((res) => {
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        return res.json();
      }),
    staleTime: 1000 * 60,
  });

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
