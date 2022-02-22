// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

var firebaseConfig = {
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
firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

function SignInScreen() {
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default SignInScreen