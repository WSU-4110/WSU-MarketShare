
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
const analytics = getAnalytics(app);
const db = firebase.database();
const auth = firebase.auth();

function togglePasswordVisibility(){
  const passwordField = document.getElementById("password");
  const toggleButton = document.getElementById(".toggle-password");

  if(passwordField.type == "password"){
    passwordField.type = "text";
    toggleButton.textContent = "Hide";
  }else{
    passwordField.type = "password";
    toggleButton.textContent = "Show";
  }
}

function loginUser(){
  const AccessID = document.getElementById("email").value;
  const Password = document.getElementById("password").value;
  auth.signInWithAccessIDandPassword(AccessID,Password)
  .then((userCredential) => {
    window.location.href = "FrontPage.html";
  })
  .catch((error) => {
    alert("Error, login not successful" + error.message);
  })
}

auth.onAuthStateChanged((user) => {
  if (user) {
      console.log("User is logged in:", user.email);
  } else {
      console.log("No user is logged in.");
  }
});

function SaveUser(userID, AccessID){
  db.ref('users/' + userID).set({
    email: email, 
    createdAt: new Date().toISOString()
  });
}

