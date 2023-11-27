// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDn_B_sa7dhQYbyc71ZGXt_wFFR8w8V-bQ",
  authDomain: "ecommerce-75708.firebaseapp.com",
  projectId: "ecommerce-75708",
  storageBucket: "ecommerce-75708.appspot.com",
  messagingSenderId: "243175431579",
  appId: "1:243175431579:web:ff394d17381e4dd18e153e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app)
const auth = getAuth(app)

export {fireDB,auth}