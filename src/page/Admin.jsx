import { useEffect, useState } from 'react'
import styles from './Admin.module.css'
import Header from '../components/Header'
import  Input  from '../components/Input'
import {BsTrash} from 'react-icons/bs'
import {toast} from 'react-toastify'
import {db} from '../services/firebaseConection' 
import {addDoc,collection, onSnapshot, query, orderBy, doc, deleteDoc} from 'firebase/firestore'

export default function Admin(){

    const[nameInput, setNameInput] = useState("")
    const[urlInput, setUrlInput] = useState("")
    const[backgroundColorInput, setBackgroundColorInput] = useState("#ffffff")
    const[colorInput, setColorInput] = useState("#121212")
    const[links, setLinks]= useState([])

    useEffect(()=>{

        const linksRef = collection(db, "links")
        const queryRef = query(linksRef, orderBy('created','asc'))
        
        const unsub= onSnapshot(queryRef, (snapshot)=>{
            let lista = []

            snapshot.forEach((doc)=>{
                lista.push({
                    id:doc.id,
                    name:doc.data().name,
                    url:doc.data().url,
                    bg:doc.data().bg,
                    color:doc.data().color
                })
            })

            setLinks(lista)
        })

    },[])

    async function handleRegister(e){
        e.preventDefault()
        
        if(nameInput === '' || urlInput ===''){
            toast.warn('Preencha todos os campos',
            {position: "top-center",
            theme: "dark"})
            return
        }

        addDoc(collection(db, 'links'), {
            name: nameInput,
            url: urlInput,
            bg: backgroundColorInput,
            color: colorInput,
            created:new Date(),
        })
        .then(()=>{
            setNameInput("")
            setUrlInput("")
            console.log('link registrado')
            toast.success(`Link Registrado`,
            {position: "top-center",
            theme: "dark"})
        })
        .catch((error)=>{
            console.log('error' + error)
            toast.error('Erro ao salvar Link')
        })
    }

    async function handleDelete(id){
        const docRef = doc(db,"links", id)
        await deleteDoc(docRef)
    }

    return(
        <div className={styles.container}>
            <Header />

            <a href='/' className={styles.title}>Arvore Link</a>

            <form 
                className={styles.form}
                onSubmit={handleRegister}
            >
                <label className={styles.label}>
                    Nome do Link
                </label>
                <Input 
                    value={nameInput}
                    placeholder='Digite o Link'
                    onChange = {(e)=>
                        setNameInput(e.target.value)
                     }
                />

                <label className={styles.label}>
                    URL do Link
                </label>
                <Input 
                    type='url'
                    placeholder='Digite a URL'
                    value={urlInput}
                    onChange = {(e)=>
                        setUrlInput(e.target.value)
                     }
                />

                <section className={styles.colors}>
                    <div>
                        <label className={styles.label_right}>Fundo do Link</label>
                        <input 
                            type='color'
                            value={backgroundColorInput}
                            onChange = {(e)=>
                                setBackgroundColorInput(e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label className={styles.label_right}>Cor do Link</label>
                        <input 
                            type='color'
                            value={colorInput}
                            onChange = {(e)=>
                                setColorInput(e.target.value)
                             }
                        />
                    </div>
                </section>
                
               {nameInput !== '' && ( 
                <div className={styles.preview}>
                    <label>Veja como está ficando </label>
                    <article 
                        className={styles.list}
                        style={{
                            margin: 8,
                            backgroundColor: backgroundColorInput
                            }}
                    >
                        <p
                            style={{color: colorInput}}
                        >{nameInput}</p>
                    </article>
                </div>
                )}

                <button 
                    type='submit'
                >
                    Cadastrar
                </button>
            </form> 

            <h2>
                Meus Links:
            </h2>

            {links.map((item, index)=>(
                <article 
                    key={index}
                    className={styles.list}
                    style={{backgroundColor: item.bg, color: item.color}}
                >
                
                    <p>{item.name}</p>

                    <div>
                        <button 
                            onClick={()=>handleDelete(item.id)}
                            className={styles.btn_delete} 
                            style={{
                                backgroundColor: item.bg, 
                                color: item.color}}
                            >
                            <BsTrash size={24} />
                        </button>
                    </div>       
                </article>
            ))}
        </div>
    )
}