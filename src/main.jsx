import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import UserData from './ContextApi/UserData.jsx';

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//const firebaseConfig = {
//  apiKey: "AIzaSyBCY9fCgyZlhVwi43-kYZyiGlqfMCGSUj8",
 // authDomain: "tabulaton-cd326.firebaseapp.com",
 // projectId: "tabulaton-cd326",
 // storageBucket: "tabulaton-cd326.appspot.com",
  //messagingSenderId: "214283613650",
 // appId: "1:214283613650:web:364f27ef001209ef07c40b",
 // measurementId: "G-J15FV64MWX"
//};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserData>

      <App />
    </UserData>
  </BrowserRouter>
)
