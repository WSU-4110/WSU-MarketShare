import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
import emailjs from 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3.11.0/+esm';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCf0qCtrXWOB6zFe36qxrxiV30HA2kEJas",
  authDomain: "wayne-state-marketshare.firebaseapp.com",
  projectId: "wayne-state-marketshare",
  storageBucket: "wayne-state-marketshare.firebasestorage.app",
  messagingSenderId: "11946478991",
  appId: "1:11946478991:web:a2382361767bb0a5e54ffa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize EmailJS
(function () {
  emailjs.init("rlnDd5iIwFwRjzmAp"); // Replace with your actual EmailJS user ID
})();

// Verify code function
window.verifyCode = async function () {
  const email = localStorage.getItem("userEmail");
  const userCode = document.getElementById("verificationCode").value;
  const messageBox = document.getElementById("message");

  if (!email || !userCode) {
    messageBox.innerHTML = "❌ Missing email or code.";
    messageBox.style.color = "red";
    return;
  }

  try {
    const docSnap = await getDoc(doc(db, "verifications", email));

    if (docSnap.exists()) {
      const storedCode = docSnap.data().code.toString();
      if (userCode === storedCode) {
        messageBox.innerHTML = "✅ Verified! Redirecting...";
        messageBox.style.color = "green";
        setTimeout(() => {
          window.location.href = "https://wsu-4110.github.io/WSU-MarketShare/frontend/FrontPage.html";
        }, 2000);
      } else {
        messageBox.innerHTML = "❌ Incorrect code. Try again.";
        messageBox.style.color = "red";
      }
    } else {
      messageBox.innerHTML = "❌ No code found. Click 'Resend Code'.";
      messageBox.style.color = "red";
    }
  } catch (error) {
    console.error("Verification Error:", error);
    messageBox.innerHTML = "❌ Error verifying code.";
    messageBox.style.color = "red";
  }
};

emailjs.init("rlnDd5iIwFwRjzmAp");

window.resendCode = async function () {
  const email = localStorage.getItem("userEmail");
  const messageBox = document.getElementById("message");

  if (!email) {
    messageBox.innerHTML = "❌ Email not found. Please log in again.";
    messageBox.style.color = "red";
    return;
  }

  const newOTP = Math.floor(100000 + Math.random() * 900000);

  try {
    await setDoc(doc(db, "verifications", email), {
      code: newOTP,
      createdAt: new Date()
    });

    await emailjs.send("service_n14ovds", "template_itcg04h", {
      to_email: email,
      code: newOTP
    });

    messageBox.innerHTML = `✅ New verification code sent to ${email}`;
    messageBox.style.color = "green";
    console.log("New OTP:", newOTP);
  } catch (error) {
    console.error("Resend Code Error:", error);
    messageBox.innerHTML = "❌ Failed to resend code.";
    messageBox.style.color = "red";
  }
};
