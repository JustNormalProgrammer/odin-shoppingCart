import styles from "./Shoppage.module.css";
import ShopNav from "../ShopNav/ShopNav";
import ShopItems from "../ShopItems/ShopItems";
import { useState } from "react";

export default function Shoppage() {

  const [selectedCategory, setSelectedCategory] = useState("None");
  const [sortBy, setSortBy] = useState("None");

  return (
    <div className={styles.container}>
      <ShopNav setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} sortBy={sortBy} setSortBy={setSortBy} />
      <ShopItems selectedCategory={selectedCategory} sortBy={sortBy}/>
    </div>
  );
}
