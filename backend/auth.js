import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCf0qCtrXWOB6zFe36qxrxiV30HA2kEJas",
  authDomain: "wayne-state-marketshare.firebaseapp.com",
  projectId: "wayne-state-marketshare",
  storageBucket: "wayne-state-marketshare.firebaseapp.com",
  messagingSenderId: "11946478991",
  appId: "1:11946478991:web:a2382361767bb0a5e54ffa",
  measurementId: "G-FCRMC500EK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let currentUser = null;

// Auth state handler
const handleAuthStateChanged = (user) => {
  try {
    currentUser = user;
    if (user) {
      console.log("✅ Logged in as:", user.email);
    } else {
      console.log("⛔ User not logged in");
    }
  } catch (error) {
    console.error("Auth state error:", error);
    currentUser = null;
  }
};

// Initialize auth state listener
const authListener = onAuthStateChanged(auth, handleAuthStateChanged);

// Async user getter
const getCurrentUserAsync = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

// Token management
const getIdToken = async () => {
  if (!currentUser) return null;
  try {
    return await currentUser.getIdToken();
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

const getAuthHeaders = async () => {
  const token = await getIdToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export {
  auth,
  currentUser,
  signOut,
  getCurrentUserAsync,
  getIdToken,
  getAuthHeaders,
  authListener
};