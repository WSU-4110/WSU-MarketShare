import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
//from firebase console


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







//commented this out for now since i am sweitching to email only

// Initialize Firebase
/** const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { 'size': 'invisible', 'callback': (response) => {
    console.log("reCAPTCHA resolved", response);
},
'expired-callback': () => {
    console.log("reCAPTCHA expired");
},
'error-callback': (error) => {
    console.error("reCAPTCHA error", error);
}
}, auth);

//sends code to phone
function sendVerificationCode(phoneNumber){
    if(!phoneNumber.startsWith("+")){
        phoneNumber = "+1" + phoneNumber;
    }
    
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        const code = prompt('Enter the code sent to your phone number');
        return confirmationResult.confirm(code);
    })
    .then((result) => {
        alert("Account Verified Successfully!");
        console.log("User Sign-In Successful", result.user);
    })
    .catch((error) => {
        console.error("Error during 2-step verification", error);
        alert("Error during 2-step verification: " + error.message);
    });   
} */