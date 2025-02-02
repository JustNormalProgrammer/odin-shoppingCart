import styles from './Homepage.module.css'
import CardItems from '../CardItems/CardItems'
export default function Homepage(){
    return (
        <main className={styles.container}>
                <CardItems/>
        </main>
    )
}