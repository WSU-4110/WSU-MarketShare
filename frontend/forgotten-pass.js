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

function resetPassword(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(!email.endsWith("@wayne.edu")){
        messageBox.innerHTML = "❌ Please Enter a valid Wayne State Email";
        messageBox.style.box = "red"; 
        return; 
    }
    sendPasswordResetEmail(auth, email)
        .then(() =>{
            messageBox.innerHTML = "✅ Reset Password Link has been sent! Check your Wayne State Email!!!!!!";
            messageBox.style.box = "green";
        })
        .catch((error) => {
            console.error("Error Sending email: ", error);
            messageBox.innerHTML = "❌ Error: " + error.message;
            messageBox.style.box = "red";
        });
}   

window.resetPassword = resetPassword;


