import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  projectId: "testing-f5157",
  appId: "1:439279379093:web:86eb8b7ba5db220af5f19c",
  databaseURL: "https://testing-f5157-default-rtdb.firebaseio.com",
  storageBucket: "testing-f5157.firebasestorage.app",
  apiKey: "AIzaSyDS6GYi5QDwNmFa75knyeJlqLwnefaBjI0",
  authDomain: "testing-f5157.firebaseapp.com",
  messagingSenderId: "439279379093",
  measurementId: "G-ELECTIONIQ01",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

/**
 * Logs a custom analytics event to Firebase Analytics.
 * @param {string} eventName - The name of the event.
 * @param {object} [params={}] - Additional parameters for the event.
 */
export const logAnalyticsEvent = (eventName, params = {}) => {
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
};
