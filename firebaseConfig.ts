// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
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

// Initialize Firebase Auth
const auth = getAuth(app);

// Export auth for use in other files
export { auth };
