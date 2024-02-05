// login.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";

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

// Validate email function
function validate_email(email) {
    // Implement your email validation logic
    return email && email.includes('@'); // Example validation
}

// Validate password function
function validate_password(password) {
    // Implement your password validation logic
    return password && password.length >= 6; // Example validation
}

// Event listener for the login form
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', signIn);

    // Add event listener for the "Forgot Password" link
    document.getElementById('forgotPasswordLink').addEventListener('click', forgotPassword);
});

function signIn(event) {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate email and password
    if (!validate_email(email) || !validate_password(password)) {
        alert('Invalid email or password format.');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then(function (userCredential) {
            const user = userCredential.user;

            // Redirect to the user cabinet page
            window.location.href = 'user-cabinet.html?uid=' + user.uid;

            alert('User signed in successfully.');
        })
        .catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorCode} - ${errorMessage}`);
        });
}

function forgotPassword() {
    const email = prompt('Enter your email address:');

    // Validate email
    if (!validate_email(email)) {
        alert('Invalid email format.');
        return;
    }

    // Send a password reset email
    sendPasswordResetEmail(auth, email)
        .then(function () {
            alert('Password reset email sent. Please check your inbox.');
        })
        .catch(function (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorCode} - ${errorMessage}`);
        });
}
  
