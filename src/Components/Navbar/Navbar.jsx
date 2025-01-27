import { NavLink } from 'react-router'
import styles from './Navbar.module.css'
export default function Navbar(){
    return (
        <nav>
            <NavLink to={'/'} end>Home</NavLink>
            <NavLink to={'/shop'} end>Shop</NavLink>
        </nav>
    )
}