import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBwRlbzwHclIcvK_aLmFKrrtH8yfJahzDU",
  authDomain: "hdcenter00.firebaseapp.com",
  projectId: "hdcenter00",
  storageBucket: "hdcenter00.appspot.com",
  messagingSenderId: "737981264374",
  appId: "1:737981264374:web:d831dd29e0a0005762d7d7",
  measurementId: "G-VS1M2025KW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

function register() {
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Validate email and password
  if (!validate_email(email) || !validate_password(password)) {
    alert('Invalid email or password format.');
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(async function (userCredential) {
      const user = userCredential.user;
      const databaseRef = ref(database);

      const user_data = {
        name: name,
        surname: surname,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        last_login: new Date().toISOString(),
      };

      await set(ref(database, 'users/' + user.uid), user_data);

      // Export user data
      exportUserData(user_data);

      // Redirect to the user cabinet page
      window.location.href = 'user-cabinet.html?uid=' + user.uid;

      alert('User created successfully.');
    })
    .catch(function (error) {
      console.error('Error creating user:', error);
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error: ${errorCode} - ${errorMessage}`);
    });
}

function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  // Check if the password length is greater than or equal to 6
  const lengthValid = password.length >= 6;

  // Check if the password contains at least one uppercase letter
  const uppercaseValid = /[A-Z]/.test(password);

  // Return true if both conditions are met
  return lengthValid && uppercaseValid;
}


// Export user data function
function exportUserData(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}

document.getElementById('registerButton').addEventListener('click', register);