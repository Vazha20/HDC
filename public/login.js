// login.js

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwRlbzwHclIcvK_aLmFKrrtH8yfJahzDU",
    authDomain: "hdcenter00.firebaseapp.com",
    projectId: "hdcenter00",
    storageBucket: "hdcenter00.appspot.com",
    messagingSenderId: "737981264374",
    appId: "1:737981264374:web:d831dd29e0a0005762d7d7",
    measurementId: "G-VS1M2025KW"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Pass the app instance to getAuth

// Check if the user is already authenticated
onAuthStateChanged(auth, (user) => {
    if (user) {
        // i want loading here
        window.location.href = 'user-cabinet.html?uid=' + user.uid;
    }
    
});

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
