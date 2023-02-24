import styles from './HomeHeader.module.css'
import {Link} from  'react-router-dom'

export default function HomeHeader(){
    return(
        <header className={styles.header_container}>
            <nav className={styles.header_nav}>
                <div className={styles.links}>
                    <Link to='/login' className={styles.link}>
                        Login
                    </Link>

                    <Link to='/admin'>
                        Admin
                    </Link> 
                </div>
            </nav>
        </header>
    )
}