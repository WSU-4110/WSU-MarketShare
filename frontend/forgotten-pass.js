import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

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

// Function to send password reset email
function resetPassword() {
    const email = document.getElementById("email").value;
    const messageBox = document.getElementById("message"); // This will show the confirmation message

    if (!email.endsWith("@wayne.edu")) {
        messageBox.innerHTML = "❌ Please enter a valid Wayne State email address.";
        messageBox.style.color = "red";
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("Password reset link sent to:", email);
            messageBox.innerHTML = "✅ A password reset link has been sent to your Wayne State email.";
            messageBox.style.color = "green";
        })
        .catch((error) => {
            console.error("Error sending reset email:", error);
            
            if (error.code === "auth/user-not-found") {
                messageBox.innerHTML = "❌ No account found with this email.";
            } else {
                messageBox.innerHTML = "❌ Error: " + error.message;
            }
            messageBox.style.color = "red";
        });
}


window.resetPassword = resetPassword;
