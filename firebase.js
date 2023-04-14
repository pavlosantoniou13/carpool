import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC-B06ZN9Zv70SEbfVXayibOslxGqaYolM",
  authDomain: "blingo-a932b.firebaseapp.com",
  projectId: "blingo-a932b",
  storageBucket: "blingo-a932b.appspot.com",
  messagingSenderId: "828594794857",
  appId: "1:828594794857:web:0e6134ed1babe9ff430df8",
  measurementId: "G-RHPTX1MBDE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider
const auth = getAuth()
const storage = getStorage()
const db = getFirestore()

export { app, provider, auth, storage, db }