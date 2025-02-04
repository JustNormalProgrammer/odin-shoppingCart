import styles from "./Shoppage.module.css";
import ShopNav from "../ShopNav/ShopNav";
import ShopItems from "../ShopItems/ShopItems";
import { useState } from "react";

export default function Shoppage() {

  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className={styles.container}>
      <ShopNav setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      <ShopItems selectedCategory={selectedCategory} />
    </div>
  );
}
