import { NavLink } from 'react-router'
import Logo from '../Logo/Logo'
import styles from './Navbar.module.css'
export default function Navbar(){
    return (
        <nav className={styles.nav}>
            <Logo></Logo>
            <ul>
                <li>
                    <NavLink className={styles.link} to={'/'} end>Home</NavLink>
                </li>
                <li>
                    <NavLink className={styles.link}  to={'/shop'} end>Shop</NavLink>
                </li>
            </ul>
        </nav>
    )
}