import styles from './Login.module.css'
import { useState } from 'react'
import { auth } from '../services/firebaseConection'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import Input from '../components/Input';

export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    function handleLogin(e){
        e.preventDefault();

        if (email === '' || password === ''){
            toast.error('Preencha todos os campos',
            {position: "top-center",
            autoClose: 1500,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark"})
            return
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(()=>{
            toast.success(`Bem vindo ${email}`,
            {position: "top-center",
            autoClose: 1500,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark"}) 
            navigate('/admin', { replace:true })
        })
        .catch(()=>{
            toast.error('Usuario ou Senha errado',
            {position: "top-center",
            autoClose: 1500,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark"})
        })
    }

    return(
        <div className={styles.container}>
            <a href='/'>Arvore Link</a>

            <form 
                className={styles.form} 
                onSubmit={handleLogin}
            >
                <Input 
                    type="email" 
                    placeholder='Digite seu e-mail'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <Input 
                    type="password" 
                    placeholder='Digite sua senha'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button 
                    type='submit'
                    className={styles.form_button}
                >
                   Acessar
                </button>
            </form>
        </div>
    )
}