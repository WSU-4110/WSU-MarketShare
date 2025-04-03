import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
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
const db = getFirestore(app);

// Function to send verification code via SendGrid
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

        // Send Email via SendGrid
        await fetch("https://api.sendgrid.com/v3/mail/send", {
            method: "POST",
            headers: {
                "Authorization": "Bearer YOUR_SENDGRID_API_KEY",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                personalizations: [{
                    to: [{ email: email }],
                    subject: "Your Wayne State Verification Code"
                }],
                from: { email: "noreply@waynestate.edu" },
                content: [{
                    type: "text/plain",
                    value: `Your verification code is: ${verificationCode}`
                }]
            })
        });

        messageBox.innerHTML = `✅ A verification code has been sent to ${email}.`;
        messageBox.style.color = "green";

        console.log("Verification Code:", verificationCode);
    } catch (error) {
        messageBox.innerHTML = `❌ Error sending verification code: ${error}`;
        messageBox.style.color = "red";
        console.error("Error saving verification code:", error);
    }
}

window.sendVerificationCode = sendVerificationCode;
