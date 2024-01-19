// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-d4e45.firebaseapp.com",
  projectId: "mern-blog-d4e45",
  storageBucket: "mern-blog-d4e45.appspot.com",
  messagingSenderId: "532795211483",
  appId: "1:532795211483:web:99f4a14fb4ccfc92b756fe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);