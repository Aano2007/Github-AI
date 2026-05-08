import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBks7wIXsEQApM2AhF9Gnym2NaklKo2xuU",
  authDomain: "github-ai-b478c.firebaseapp.com",
  projectId: "github-ai-b478c",
  storageBucket: "github-ai-b478c.firebasestorage.app",
  messagingSenderId: "1066418997233",
  appId: "1:1066418997233:web:4c47a79feebf0b739de650",
  measurementId: "G-0EZN4M8CZM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
