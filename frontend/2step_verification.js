import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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
const db = getFirestore(app);

// Function to send verification code
async function sendVerificationCode() {
    const email = document.getElementById("userEmail").value;
    const messageBox = document.getElementById("message");

    if (!email.endsWith("@wayne.edu")) {
        messageBox.innerHTML = "❌ Please enter a valid Wayne State email.";
        messageBox.style.color = "red";
        return;
    }

    // Generate a 6-digit OTP
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    try {
        // Save the code in Firestore
        await setDoc(doc(db, "verifications", email), { code: verificationCode });

        // Store the email in localStorage
        localStorage.setItem("userEmail", email);

        messageBox.innerHTML = `✅ A verification code has been sent to ${email}. Redirecting...`;
        messageBox.style.color = "green";

        console.log("Verification Code:", verificationCode);

        // Redirect to code entry page after 2 seconds
        setTimeout(() => {
            window.location.href = "verify_code.html";
        }, 2000);
    } catch (error) {
        messageBox.innerHTML = `❌ Error sending verification code: ${error}`;
        messageBox.style.color = "red";
        console.error("Error saving verification code:", error);
    }
}

window.sendVerificationCode = sendVerificationCode;
