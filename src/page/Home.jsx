import styles from './Home.module.css'
import { useState, useEffect } from 'react'
import {getDocs, collection, orderBy, query} from 'firebase/firestore'
import {db} from '../services/firebaseConection'
import HomeHeader from '../components/HomeHeader'

export default function Home() {

  const [links, setLinks] = useState([])

  useEffect(()=>{
    
    function loadLinks(){
      const linksRef = collection(db, 'links')
      const queryRef = query(linksRef, orderBy('created','asc'))

      getDocs(queryRef)
      .then((snapshot)=>{
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
    }

    loadLinks()
  },[])

  return (
    <div className={styles.container}>
      <HomeHeader />
      <a href='/' className={styles.title}>Arvore Link</a>
      <p>Veja meus links aqui:</p>

      <main className={styles.link}>

        {links.map((item)=>(
          <section 
            className={styles.link_area}
            key={item.id}
            style={{backgroundColor:item.bg}}
            >
            <a href={item.url} target='_blank'>
              <p style={{color: item.color}}>{item.name}</p>
            </a>
          </section>
        ))}     

      </main>
    </div>
  )
}


