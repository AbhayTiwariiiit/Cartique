import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-157e1.firebaseapp.com",
  projectId: "auth-157e1",
  storageBucket: "auth-157e1.firebasestorage.app",
  messagingSenderId: "644071917422",
  appId: "1:644071917422:web:cb2e1b942ddc4f1351637f"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
