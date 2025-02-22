import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCf0qCtrXWOB6zFe36qxrxiV30HA2kEJas",
    authDomain: "wayne-state-marketshare.firebaseapp.com",
    projectId: "wayne-state-marketshare",
    storageBucket: "wayne-state-marketshare.firebasestorage.app",
    messagingSenderId: "11946478991",
    appId: "1:11946478991:web:a2382361767bb0a5e54ffa",
    measurementId: "G-FCRMC500EK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Toggle password visibility function
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

// Login function with fixed redirection
function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageBox = document.getElementById("message"); // Fixed the undefined variable issue

    if (!email.endsWith("@wayne.edu")) {
        messageBox.innerHTML = "❌ Please enter a valid Wayne State email.";
        messageBox.style.color = "red"; 
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Login successful! User:", user.email);
            
            messageBox.innerHTML = "✅ Welcome, redirecting...";
            messageBox.style.color = "green";

            // Wait for 1.5 seconds before redirecting
            setTimeout(() => {
                window.location.href = "https://wsu-4110.github.io/WSU-MarketShare/frontend/FrontPage.html";
            }, 1500);
        })
        .catch((error) => {
            console.error("Login failed:", error);

            // Handling specific Firebase authentication errors
            if (error.code === "auth/wrong-password") {
                messageBox.innerHTML = "❌ Incorrect password. Please try again.";
            } else if (error.code === "auth/user-not-found") {
                messageBox.innerHTML = "❌ No account found with this email.";
            } else if (error.code === "auth/too-many-requests") {
                messageBox.innerHTML = "⚠️ Too many failed attempts. Try again later.";
            } else {
                messageBox.innerHTML = "❌ Login failed: " + error.message;
            }
            messageBox.style.color = "red";
        });
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.email);
    } else {
        console.log("No user is logged in.");
    }
});

// Function to save user (Optional)
function saveUser(userID, email) {
    console.log("Saving user:", userID, email);
}

// Make functions accessible in HTML
window.togglePasswordVisibility = togglePasswordVisibility;
window.loginUser = loginUser;
window.saveUser = saveUser;
