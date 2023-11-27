
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  // apiKey: '',
  // authDomain: '',
  // projectId: '',
  // storageBucket: '',
  // messagingSenderId: '',
  // appId: '',
  apiKey: 'AIzaSyDZg7kdv6WccQ3IB8oXfnvV2mveo-2sVy8',
  authDomain: 'learning-e61ba.firebaseapp.com',
  databaseURL: 'https://learning-e61ba-default-rtdb.firebaseio.com',
  projectId: 'learning-e61ba',
  storageBucket: 'learning-e61ba.appspot.com',
  messagingSenderId: '198199031762',
  appId: '1:198199031762:web:22b9ff501ff466b6c23a0b',
}


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);


export const signInWithGoogle = () => signInWithPopup(auth, provider);