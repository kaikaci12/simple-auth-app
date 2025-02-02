// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, Auth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyovPACbaCmOqQl5ouBpahO1RfrRzJIlA",
  authDomain: "auth-app-6792d.firebaseapp.com",
  projectId: "auth-app-6792d",
  storageBucket: "auth-app-6792d.firebasestorage.app",
  messagingSenderId: "659766461773",
  appId: "1:659766461773:web:cea42ff9e843e80472e304",
  measurementId: "G-WFPV3P8D2M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
