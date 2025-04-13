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
export async function getCurrentUserAsync() {
  const auth = getAuth();
  return new Promise((resolve) => {
    let unsubscribe;
    unsubscribe = onAuthStateChanged(auth, (user) => {
      if (unsubscribe) {
        unsubscribe(); // Call unsubscribe only if it is initialized
      }
      resolve(user);
    });
  });
}

// Token management
export async function getIdToken() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    return await user.getIdToken();
  }
  return null;
}

export async function getAuthHeaders() {
  const token = await getIdToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

export {
  auth,
  currentUser,
  signOut,
  authListener
};