import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "perfectboat-1afb7.firebaseapp.com",
  projectId: "perfectboat-1afb7",
  storageBucket: "perfectboat-1afb7.appspot.com",
  messagingSenderId: "710726380778",
  appId: "1:710726380778:web:dc61795a7ac36645cdfb93",
  measurementId: "G-N6EQLMBLWD",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider("apple.com");
export const db = getFirestore(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default app; // Export the app if needed
