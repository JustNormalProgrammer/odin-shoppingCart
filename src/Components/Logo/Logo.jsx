import LogoImg from '../../assets/logo-svgrepo-com.svg'
import styles from './Logo.module.css'
export default function Logo(){
    return (
        <div className={styles.logoGroup}>
            <img src={LogoImg} className={styles.logo} alt="Logo" />
            <div className={styles.logoText}>ReactShop</div>
        </div>
    )
}