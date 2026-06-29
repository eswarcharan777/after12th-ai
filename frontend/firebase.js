// Firebase configuration for After12th-AI
// =================================================================
// SETUP STEPS (one-time, takes ~5 mins, FREE — no credit card):
// 1. Go to https://console.firebase.google.com/
// 2. Click "Add project" → name it "after12th-ai" → Continue → Continue → Create project
// 3. Once created, click the "</>" (Web) icon to add a web app
// 4. Register app with nickname "after12th-web" (DO NOT check Firebase Hosting)
// 5. Firebase will show you a `firebaseConfig = { ... }` object — COPY ITS VALUES below
// 6. Then in the left menu: Build → Authentication → Get Started
// 7. Under "Sign-in method", enable: (a) Email/Password  (b) Google
// 8. Save and you're done!
// =================================================================

import { initializeApp } from 'firebase/app';
import {
  getAuth, onAuthStateChanged,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, GoogleAuthProvider, updateProfile, signOut,
} from 'firebase/auth';
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot, serverTimestamp,
  collection, addDoc, getDocs, query, orderBy, limit, where, increment,
} from 'firebase/firestore';

// 🔑 PASTE YOUR FIREBASE CONFIG VALUES HERE (from step 5 above):
const firebaseConfig = {
  apiKey: "AIzaSyAaMGHOMWPrMV3bZGdMhzkG0xO_F1c17Io",
  authDomain: "after12th-ai.firebaseapp.com",
  projectId: "after12th-ai",
  storageBucket: "after12th-ai.firebasestorage.app",
  messagingSenderId: "774372146581",
  appId: "1:774372146581:web:984286a4e57768a1210a9c",
};

const isFirebaseConfigured =
  firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY';
export { isFirebaseConfigured };

let app = null;
let auth = null;
let db = null;
if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { auth, db, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile, signOut, doc, getDoc, setDoc, updateDoc, onSnapshot, serverTimestamp, collection, addDoc, getDocs, query, orderBy, limit, where, increment };
