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

    if(!email.endsWith("@wayne.edu")){
        messageBox.innerHTML = "❌ Please Enter a valid Wayne State Email";
        messageBox.style.box = "red"; 
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Login successful. Redirecting to verification...");
            
            localStorage.setItem("userEmail: ", email);
            messageBox.innerHTML = "✅Login successful!! but You'll need to verify yourself first ha"
            messageBox.style.box = "green";
            setTimeout(() =>{
                window.location.href = "2Step_Verification.html";
                }, 1500);
            })
            
        
        .catch((error) => {
            console.error("Login failed:", error);
            //handling specific firebase authentication errors
            if(error.code === "auth/wrong-password"){
                messageBox.innerHTML = "❌ Incorrect password. Please try again. ";
            }else if(error.code === "auth/user-not-found"){
                messageBox.innerHTML = "❌ User not found. Please try again.";
            }else if(error.code === "auth/too-many-attempts"){
                messageBox.innerHTML = "❌ Too many attempts. Please try again later";
            }else{
                messageBox.innerHTML = "❌ Login failed: " + error.message;
            }
            messageBox.style.box = "red";
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



function saveUser(userID, email) {
    const db = firebase.database();
    db.ref('users/' + userID).set({
        email: email,
        createdAt: new Date().toISOString()
    });
}



window.togglePasswordVisibility = togglePasswordVisibility;
window.loginUser = loginUser;
window.saveUser = saveUser;


