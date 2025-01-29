import styles from './CardItem.module.css'
import mainLogo from '../../../assets/logo-svgrepo-com.svg'
export default function CardItem(){
    return (
        <div className={styles.cardItem}>
            <img className={styles.logo} src={mainLogo} alt="" />
            <div className={styles.textSection}>
                <h1 className={styles.mainHeader}>React Shop</h1>
                <div className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique, architecto, placeat veniam tenetur vel, consectetur ratione eligendi officiis reiciendis eaque porro? Voluptas assumenda quas nostrum quo quae voluptatem, eligendi dolorem illo rerum alias explicabo reiciendis error quam consectetur harum non amet ut molestias quia, et, eaque inventore porro dolorum! Vel?</div>
            </div>
        </div>
    )
}