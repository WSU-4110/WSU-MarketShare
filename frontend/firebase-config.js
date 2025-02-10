
//from firebase console


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSVrwBNAsbsOfAGbF_4cwdj843YUQnQmM",
  authDomain: "stepverification-e296b.firebaseapp.com",
  projectId: "stepverification-e296b",
  storageBucket: "stepverification-e296b.firebasestorage.app",
  messagingSenderId: "500001490535",
  appId: "1:500001490535:web:91f1b958c1dc065aaef6c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

window.recaptchaVerifier = new RecaptchaVerifier('sendCodeBtn', { 'size': 'invisible', 'callback': (response) => {
    console.log("reCAPTCHA resolved", response);
}
}, auth);

//sends code to phone
function sendVerificationCode(phoneNumber){
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResults) => {
        const code = prompt('Enter the code sent to your phone number');
        return confirmationResults.confirm(code);
    })
    .then((result) => {
        alert("Account Verified Successfully!");
        console.log("User Sign-In Successful", result.user);
    })
    .catch((error) => {
        console.error("Error during 2-step verification", error);
        alert("Error during 2-step verification: " + error.message);
    });
}