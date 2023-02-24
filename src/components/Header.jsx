import styles from './Header.module.css'
import {BiLogOutCircle} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import {auth} from '../services/firebaseConection'
import {signOut} from 'firebase/auth'

export default function Header(){

    async function handleLogOut(){
        await signOut(auth)
    }

    return (
        <header className={styles.header_container}>
            <nav className={styles.header_nav}>

                <button onClick={handleLogOut}>
                    <BiLogOutCircle size={28} color='#DB2629'/>
                </button>

                <div className={styles.links}>
                    <Link to='/login' className={styles.link}>
                        Login
                    </Link>

                    <Link to='/admin'>
                        Sign In
                    </Link> 
                </div>
                
            </nav>
        </header>
    )
}