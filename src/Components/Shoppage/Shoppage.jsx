import styles from './Shoppage.module.css'
import ShopNav from '../ShopNav/ShopNav'
import ShopItems from '../ShopItems/ShopItems'
export default function Shoppage(){
    return (
        <div className={styles.container}>
            <ShopNav/>
            <ShopItems/>
        </div>
    )
}