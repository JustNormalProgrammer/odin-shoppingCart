import styles from "./ShopNav.module.css";
import PropTypes from "prop-types";
import useCategories from "../../Queries/useCategories";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function NavItem({ content, setSelected, selected }) {
  function onSelect(e) {
    const category = e.target.textContent;
    if (category === selected) {
      setSelected("None");
      return;
    }
    setSelected(category);
  }
  return (
    <div
      className={selected === content ? styles.active : ""}
      onClick={onSelect}
    >
      {content}
    </div>
  );
}

NavItem.propTypes = {
  content: PropTypes.string,
  setSelected: PropTypes.func,
  selected: PropTypes.string,
};

function ShopNavSection({ children, header }) {
  return (
    <div className={styles.navCard}>
      <div className={styles.sectionHeader}>{header}</div>
      <div className={styles.cardContent}>{children}</div>
    </div>
  );
}
ShopNavSection.propTypes = {
  children: PropTypes.any,
  header: PropTypes.string,
};
function Categories(props) {
  const { isPending, error, data } = useCategories();

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {isPending ? (
        <>
          <Skeleton
            count={4}
            baseColor="#2f293a"
            highlightColor="#a190fa"
            height={25}
          />
        </>
      ) : (
        data.map((value) => {
          return <NavItem key={value} content={value} {...props} />;
        })
      )}
    </>
  );
}
function SortByOptions(props) {
  const arr = ["Price asc", "Price desc", "Rating asc", "Rating desc"];
  return (
    <>
      {arr.map((option) => (
        <NavItem key={option} content={option} {...props} />
      ))}
    </>
  );
}

export default function ShopNav({
  setSelectedCategory,
  selectedCategory,
  sortBy,
  setSortBy,
}) {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navWrapper}>
        <ShopNavSection header="Categories">
          <Categories
            setSelected={setSelectedCategory}
            selected={selectedCategory}
          />
        </ShopNavSection>
        <ShopNavSection header="Sort by">
          <SortByOptions setSelected={setSortBy} selected={sortBy} />
        </ShopNavSection>
      </div>
    </nav>
  );
}

ShopNav.propTypes = {
  setSelectedCategory: PropTypes.func,
  selectedCategory: PropTypes.string,
  sortBy: PropTypes.string,
  setSortBy: PropTypes.func,
};
