import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

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

const email = localStorage.getItem("userEmail");
document.getElementById("userEmail").value = email;

const verificationCode = Math.floor(10000 + Math.random() * 90000);

async function verificationCode(){
    const messageBox = document.getElementById("message");

    try{
        await setDoc(doc(db, "verifications", email), {code: verificationCode});
        messageBox.innerHTML = `✅ Verification code sent to ${email}`;
        messageBox.style.color = "green";
        console.log("Verification code: ", verificationCode);
    }catch(error){
        messageBox.innerHTML = `❌ Error sending verification code: ${error}`;
        messageBox.style.color = "red";
        console.error("error saving verification code: ", error);
    }
}

async function verifyCode(){
    const userCode = document.getElementById("verificationCode").value;
    const messageBox = document.getElementById("message");

    try{
        const docsnap = await getDoc(doc(db, "verifications", email));
        if(docsnap.exists() && userCode == docsnap.data.code().toString()){
            messageBox.innerHTML = `✅ Verification successful!`;
            messageBox.style.color = "green";
            setTimeout(() =>{
                window.location.href = "https://wsu-4110.github.io/WSU-MarketShare/frontend/FrontPage.html";
            }, 1500)
        }
    }catch(error){
        console.error("error verifying code",error);
        messageBox.innerHTML = "❌ error verifying code";
        messageBox.style.color = "red";
    }
}

verificationCode();
window.sendVerificationCode = verificationCode;
window.verifyCode = verifyCode;