import styles from './ShopItems.module.css'
import PropTypes from 'prop-types'

function ShopItem({title, price, category, description, image, rating}){
    return (
        <div className={styles.shopItem}>
            <img src={image} alt={title} />
        </div>
    )
}

ShopItem.propTypes = {
    title: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.exact({
        rate: PropTypes.number,
        count: PropTypes.number
    })
}

export default function ShopItems(){
    return (
        <div className={styles.shopContainer}>
            <ShopItem title="Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops" price={109.95} description="Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday" category="men's clothing" image="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" rating={{"rate": 3.9, "count": 120}}/>
        </div>
    )
}