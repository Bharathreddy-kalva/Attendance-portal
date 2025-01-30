import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA4cL8vXx8wqOY4zJhP7Z4gDgNfk67PvTw",
  authDomain: "college-attendance-8e26f.firebaseapp.com",
  projectId: "college-attendance-8e26f",
  storageBucket: "college-attendance-8e26f.firebasestorage.app",
  messagingSenderId: "328625336623",
  appId: "1:328625336623:web:cf29ade4577dc5d9b7b1da",
  measurementId: "G-70S9BRW693"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
