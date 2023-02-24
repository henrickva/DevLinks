import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCkANSgHE0mZ4NIalPmTyBb85tKlQ-tMWE",
  authDomain: "linktree-97.firebaseapp.com",
  projectId: "linktree-97",
  storageBucket: "linktree-97.appspot.com",
  messagingSenderId: "1076475924886",
  appId: "1:1076475924886:web:49d33be6cac026fb930db7",
  measurementId: "G-E8VG39YLFN"
};

const firebaseApp = initializeApp(firebaseConfig)

const db= getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export{ db, auth};