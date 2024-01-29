// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyByvcMwXGwxvbhoW6Ys6ip0udq1ZuM1bpA",
    authDomain: "hdc-project111.firebaseapp.com",
    projectId: "hdc-project111",
    storageBucket: "hdc-project111.appspot.com",
    messagingSenderId: "1031505541323",
    appId: "1:1031505541323:web:5abcd1ae3ff98c62f7834e",
    measurementId: "G-93VP5RG2GP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Pass the app instance to getAuth

// Login function
function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;


  signInWithEmailAndPassword(auth, email, password)
    .then(function (userCredential) {
      const user = userCredential.user;
      alert('Login successful! User ID: ' + user.uid);
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error: ${errorCode} - ${errorMessage}`);
    });
}


// Event listener for the login button
document.getElementById('loginButton').addEventListener('click', login);
