// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSbkZcepxDBtYnPJAho-PtnxgoUqZeYwY",
  authDomain: "chat-react-app-5d0a4.firebaseapp.com",
  projectId: "chat-react-app-5d0a4",
  storageBucket: "chat-react-app-5d0a4.appspot.com",
  messagingSenderId: "1086244392429",
  appId: "1:1086244392429:web:545dc7286fce688a986be4",
  measurementId: "G-RKB7Z2JLPM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore();