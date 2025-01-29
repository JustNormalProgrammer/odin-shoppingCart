import styles from './CardItems.module.css'
import CardItem from './CardItem/CardItem'
import CardItemInv from './CardItemInv/CardItemInv'
export default function CardItems(){
    return (
        <div className={styles.cardWrapper}>
            <CardItem/>
            <CardItemInv/>
        </div>
    )
}