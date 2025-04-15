import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCf0qCtrXWOB6zFe36qxrxiV30HA2kEJas",
  authDomain: "wayne-state-marketshare.firebaseapp.com",
  projectId: "wayne-state-marketshare",
  storageBucket: "wayne-state-marketshare.firebasestorage.app",
  messagingSenderId: "11946478991",
  appId: "1:11946478991:web:a2382361767bb0a5e54ffa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize EmailJS
(function () {
  emailjs.init("rlnDd5iIwFwRjzmAp"); 
})();

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

function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const messageBox = document.getElementById("message");

  if (!email.endsWith("@wayne.edu")) {
    messageBox.innerHTML = "❌ Please enter a valid Wayne State email.";
    messageBox.style.color = "red";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(async () => {
      console.log("✅ Login successful. Sending verification code...");

      const otp = Math.floor(100000 + Math.random() * 900000);

      try {
        // Store email & OTP
        localStorage.setItem("userEmail", email);
        await setDoc(doc(db, "verifications", email), {
          code: otp,
          createdAt: new Date()
        });

        // Send email via EmailJS
        await emailjs.send("service_n14ovds", "template_itcg04h", {
          to_email: email,
          code: otp
        });

        console.log("📩 OTP sent:", otp);
        emailjs.send("service_n14ovds", "template_itcg04h",otp);
        messageBox.innerHTML = "✅ Login successful! Sending code...";
        messageBox.style.color = "green";

        setTimeout(() => {
          window.location.href = "verify_code.html";
        }, 1000);

      } catch (error) {
        console.error("❌ Error sending verification code:", error);
        messageBox.innerHTML = "❌ Login succeeded, but failed to send code.";
        messageBox.style.color = "red";
      }
    })
    .catch((error) => {
      console.error("Login failed:", error);

      if (error.code === "auth/wrong-password") {
        messageBox.innerHTML = "❌ Incorrect password.";
      } else if (error.code === "auth/user-not-found") {
        messageBox.innerHTML = "❌ User not found.";
      } else if (error.code === "auth/too-many-requests") {
        messageBox.innerHTML = "❌ Too many attempts. Try again later.";
      } else {
        messageBox.innerHTML = "❌ Login failed: " + error.message;
      }

      messageBox.style.color = "red";
    });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user.email);
  }
});

window.togglePasswordVisibility = togglePasswordVisibility;
window.loginUser = loginUser;



