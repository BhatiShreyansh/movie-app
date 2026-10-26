import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Asali Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeZQqgzjKo9Oxca6jNaZbyRYrMvIUeoyI",
  authDomain: "cineverse-91c85.firebaseapp.com",
  projectId: "cineverse-91c85",
  storageBucket: "cineverse-91c85.firebasestorage.app",
  messagingSenderId: "6122185312",
  appId: "1:6122185312:web:b6edf0369a029677a69905",
  measurementId: "G-8SC7J4R8GK"
};

// Initialize Firebase App & Auth
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
