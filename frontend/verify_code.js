import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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
const db = getFirestore(app);

// Retrieve the email from localStorage
const email = localStorage.getItem("userEmail");

async function verifyCode() {
    const userCode = document.getElementById("verificationCode").value;
    const messageBox = document.getElementById("message");

    try {
        // Fetch stored code from Firestore
        const docSnap = await getDoc(doc(db, "verifications", email));

        if (docSnap.exists() && userCode === docSnap.data().code.toString()) {
            messageBox.innerHTML = "✅ Verification successful! Redirecting...";
            messageBox.style.color = "green";

            // Redirect to homepage after verification
            setTimeout(() => {
                window.location.href = "https://wsu-4110.github.io/WSU-MarketShare/frontend/FrontPage.html";
            }, 2000);
        } else {
            messageBox.innerHTML = "❌ Incorrect code. Try again.";
            messageBox.style.color = "red";
        }
    } catch (error) {
        console.error("Error verifying code:", error);
        messageBox.innerHTML = "❌ Error verifying code.";
        messageBox.style.color = "red";
    }
}

window.verifyCode = verifyCode;
