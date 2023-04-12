// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export { app, provider, auth }