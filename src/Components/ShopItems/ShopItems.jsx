import styles from './ShopItems.module.css'
import CartIcon from '../../assets/cart-plus-svgrepo-com.svg'
import MinusIcon from '../../assets/minus-svgrepo-com.svg'
import PlusIcon from '../../assets/plus-large-svgrepo-com.svg'
import PropTypes from 'prop-types'

function ShopItem({title, price, image, rating}){
    return (
        <div className={styles.shopItem}>
            <img src={image} alt={title} />
            <div className={styles.itemTitle}>{title}</div>
            <div className={styles.rating}>{rating.rate}</div>
            <div className={styles.infoGroupWrapper}>
                    <div className={styles.price}>{price}$</div>
                    <div className={styles.selectQty}>
                        <img src={MinusIcon} alt="Delete item"/>
                        <input type="text" inputMode='numeric' />
                        <img src={PlusIcon} alt="Add item" />
                    </div>
                    <img src={CartIcon} alt="Add to cart"/>
            </div>
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
            <ShopItem title="Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops" price={109.95} image="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" rating={{"rate": 3.9, "count": 120}}/>
        </div>
    )
}