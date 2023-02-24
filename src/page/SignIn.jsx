import styles from './SignIn.module.css'
import Input from "../components/Input"
import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import {auth} from '../services/firebaseConection'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import HomeHeader from '../components/HomeHeader'
export default function Auth(){

    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[name,setName] = useState("")
    const navigate = useNavigate()

    async function handleCad(e){
        
        e.preventDefault()

        await createUserWithEmailAndPassword(auth,email, password,name)
        .then(()=>{
            toast.success(`Bem vindo ${name}`,
            {position: "top-center",
            autoClose: 1500,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark"}) 
            navigate('/admin', { replace:true })
        })
        .catch((error)=>{
            toast.error('Usuario ou Senha errado ' + error,
            {position: "top-center",
            autoClose: 3000,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark"})
        })
    }

    return(
        <div className={styles.container}>
            <HomeHeader />
            <form 
                className={styles.form}
                onSubmit={handleCad}
            >
                 <label>Nome</label>
                <Input 
                    placeholder='Digite seu nome'
                    onChange={(e) =>setName(e.target.value)}
                />

                <label>Email</label>
                <Input 
                    type='email'
                    placeholder='Digite seu email '
                    onChange={(e) =>setEmail(e.target.value)}
                />

                <label>Senha</label>
                <Input 
                    type='password'
                    placeholder='Digite sua senha '
                    onChange={(e) =>setPassword(e.target.value)}
                />
                

                <button 
                    type='submit'
                    className={styles.form_button}
                >
                   Cadastrar
                </button>
            </form>
           
        </div>
    )
}