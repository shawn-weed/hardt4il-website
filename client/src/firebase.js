// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hardt4il.firebaseapp.com",
  projectId: "hardt4il",
  storageBucket: "hardt4il.appspot.com",
  messagingSenderId: "19446491093",
  appId: "1:19446491093:web:6b4626cf6b90637826bf5c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);