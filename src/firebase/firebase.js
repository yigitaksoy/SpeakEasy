import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "speakeasy-chat-app.firebaseapp.com",
  projectId: "speakeasy-chat-app",
  storageBucket: "speakeasy-chat-app.appspot.com",
  messagingSenderId: "1018622023023",
  appId: "1:1018622023023:web:a4d3772d8356bfb0d0849a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
