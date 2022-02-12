// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyntkfoupWFOIgv_eO6r01BK0GFZmyaXc",
  authDomain: "factory-calculator.firebaseapp.com",
  databaseURL: "https://factory-calculator-default-rtdb.firebaseio.com",
  projectId: "factory-calculator",
  storageBucket: "factory-calculator.appspot.com",
  messagingSenderId: "1082675020709",
  appId: "1:1082675020709:web:8246cf251d970d48fb9e4c",
  measurementId: "G-5NW4N5DDZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);