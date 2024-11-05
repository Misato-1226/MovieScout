// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmcEGII0-tx5lL9JKGmrMEgJSouC0B4-4",
  authDomain: "movie-scout-26418.firebaseapp.com",
  projectId: "movie-scout-26418",
  storageBucket: "movie-scout-26418.appspot.com",
  messagingSenderId: "610352876029",
  appId: "1:610352876029:web:59ecf9d10dc7d73037b194",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
