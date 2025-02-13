import styles from "./ShopNav.module.css";
import PropTypes from "prop-types";
import useCategories from "../../Queries/useCategories";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function NavItem({ content, setSelectedCategory, selectedCategory}) {
  function onSelect(e){
    const category = e.target.textContent;
    if(category === selectedCategory){
      setSelectedCategory('All');
      return;
    }
    setSelectedCategory(category);
  }
  return <div className={selectedCategory === content ? styles.active : ''} onClick={onSelect}>{content}</div>;
}

NavItem.propTypes = {
  content: PropTypes.string,
};

function CategorySection(props) {

  const { isPending, error, data } = useCategories();

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={styles.navCard}>
      <div className={styles.sectionHeader}>Categories</div>
      <div className={styles.cardContent}>
        {isPending ? <Skeleton count={4} baseColor="#2f293a" highlightColor="#a190fa" height={25}/> : data.map((value) => {
          return <NavItem key={value} content={value} {...props}/>;
        })}
      </div>
    </div>
  );
}

export default function ShopNav(props) {
  return (
    <nav className={styles.navContainer}>
      <CategorySection {...props}/>
    </nav>
  );
}
