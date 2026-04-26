import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  projectId: "testing-f5157",
  appId: "1:439279379093:web:86eb8b7ba5db220af5f19c",
  databaseURL: "https://testing-f5157-default-rtdb.firebaseio.com",
  storageBucket: "testing-f5157.firebasestorage.app",
  apiKey: "AIzaSyDS6GYi5QDwNmFa75knyeJlqLwnefaBjI0",
  authDomain: "testing-f5157.firebaseapp.com",
  messagingSenderId: "439279379093",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
