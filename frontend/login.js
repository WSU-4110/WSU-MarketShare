import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

import {
    getDatabase,
    ref,
    set
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCf0qCtrXWOB6zFe36qxrxiV30HA2kEJas",
    authDomain: "wayne-state-marketshare.firebaseapp.com",
    projectId: "wayne-state-marketshare",
    storageBucket: "wayne-state-marketshare.appspot.com", // fixed domain typo
    messagingSenderId: "11946478991",
    appId: "1:11946478991:web:a2382361767bb0a5e54ffa",
    measurementId: "G-FCRMC500EK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordField = document.getElementById("password");
    const toggleButton = document.querySelector(".toggle-password");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleButton.textContent = "Hide";
    } else {
        passwordField.type = "password";
        toggleButton.textContent = "Show";
    }
}

// Login user
function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const messageBox = document.getElementById("message");

    if (!email.endsWith("@wayne.edu")) {
        messageBox.innerHTML = "❌ Please enter a valid Wayne State email.";
        messageBox.style.color = "red";
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Save email for later
            saveUser(user.uid, email);
  

            messageBox.innerHTML = "✅ Login successful! Redirecting...";
            messageBox.style.color = "green";

            // Redirect after short delay
            setTimeout(() => {
                window.location.href = "FrontPage.html"; // Redirect to frontpage
            }, 1500);
        })
        .catch((error) => {
            console.error("Login failed:", error);

            if (error.code === "auth/wrong-password") {
                messageBox.innerHTML = "❌ Incorrect password. Please try again.";
            } else if (error.code === "auth/user-not-found") {
                messageBox.innerHTML = "❌ User not found. Please try again.";
            } else if (error.code === "auth/too-many-requests") {
                messageBox.innerHTML = "❌ Too many attempts. Try again later.";
            } else {
                messageBox.innerHTML = "❌ Login failed: " + error.message;
            }

            messageBox.style.color = "red";
        });
}

// Monitor auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("✅ User logged in:", user.email);
    } else {
        console.log("ℹ️ No user is logged in.");
    }
});

// Unused, but defined in case you want to store user data later
function saveUser(userID, email) {
    set(ref(database, 'users/' + userID), {
        email: email,
        createdAt: new Date().toISOString()
    }).then(() => {
        console.log("✅ User data saved successfully");
    }).catch((error) => {
        console.error("❌ Failed to save user data:", error);
    });
}

// Attach functions to window so HTML can access them
window.togglePasswordVisibility = togglePasswordVisibility;
window.loginUser = loginUser;
window.saveUser = saveUser;
