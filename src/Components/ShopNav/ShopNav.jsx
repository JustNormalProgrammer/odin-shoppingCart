import styles from "./ShopNav.module.css";
import PropTypes from "prop-types";
function NavItem({ content }) {
  return <div className={styles.navItem}>{content}</div>;
}

NavItem.propTypes = {
  content: PropTypes.string,
};

function CategorySection() {
  const category = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];
  return (
    <div className={styles.navCard}>
      <div className={styles.sectionHeader}>Categories</div>
      <div className={styles.cardContent}>
        {category.map((value) => {
          return <NavItem key={value} content={value} />;
        })}
      </div>
    </div>
  );
}

export default function ShopNav() {
  return (
    <nav className={styles.navContainer}>
      <CategorySection />
    </nav>
  );
}
