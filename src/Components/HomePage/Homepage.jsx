import styles from './Homepage.module.css'
import mainLogo from '../../assets/logo-svgrepo-com.svg'
import CardItems from '../CardItems/CardItems'
export default function Homepage(){
    return (
        <main className={styles.container}>
                <CardItems/>
        </main>
    )
}