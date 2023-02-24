import styles from './Input.module.css'

export default function Input(props){
    return(
        <input 
        className={styles.form_input}
        {...props}
        />
    )
}