import Header from "../components/Header"
import styles from './Networks.module.css'
import Input from "../components/Input"

export default function Networks(){
    return(
        <div className={styles.container}>
            <Header />

            <h2> Suas Redes Sociais</h2>

            <form className={styles.form}>
                <label>Rede Social 1</label>
                <Input 
                     placeholder='Digite sua rede..'
                />
            </form>
            
        </div>
    )
}