import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCf0qCtrXWOB6zFe36qxrxiV30HA2kEJas",
    authDomain: "wayne-state-marketshare.firebaseapp.com",
    projectId: "wayne-state-marketshare",
    storageBucket: "wayne-state-marketshare.appspot.com",
    messagingSenderId: "11946478991",
    appId: "1:11946478991:web:a2382361767bb0a5e54ffa",
    measurementId: "G-FCRMC500EK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize EmailJS
(function () {
    emailjs.init("rlnDd5iIwFwRjzmAp"); 
})();

// Function to send the verification code
async function sendVerificationCode() {
    const email = document.getElementById("userEmail").value;
    const messageBox = document.getElementById("message");

    if (!email.endsWith("@wayne.edu")) {
        messageBox.innerHTML = "❌ Please enter a valid Wayne State email.";
        messageBox.style.color = "red";
        return;
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    try {
        // Save the code to Firestore
        await setDoc(doc(db, "verifications", email), {
            code: verificationCode,
            createdAt: new Date()
        });

        // Send the OTP via EmailJS
        await emailjs.send("service_n14ovds", "template_itcg04h", {
            to_email: email,
            code: verificationCode
        });

        // Save email to local storage
        localStorage.setItem("userEmail", email);

        messageBox.innerHTML = `✅ A verification code has been sent to ${email}. Redirecting...`;
        messageBox.style.color = "green";
        console.log("Verification Code:", verificationCode);

        setTimeout(() => {
            window.location.href = "verify_code.html";
        }, 2000);

    } catch (error) {
        console.error("Error sending verification code:", error);
        messageBox.innerHTML = `❌ Error sending verification code.`;
        messageBox.style.color = "red";
    }
}

window.sendVerificationCode = sendVerificationCode;
