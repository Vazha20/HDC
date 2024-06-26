// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js';

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
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

// Read user data from localStorage
const userDataString = localStorage.getItem('userData');
const userData = userDataString ? JSON.parse(userDataString) : null;

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Reference to the user's data in the database
    const userRef = ref(getDatabase(firebaseApp), 'users/' + user.uid);

    // Listen for changes in user data
    onValue(userRef, (snapshot) => {
      const databaseUserData = snapshot.val();
      const combinedUserData = { ...databaseUserData, ...userData };
      displayUserInfo(combinedUserData);
    });
  } else {
    console.log('No user is signed in.');
  }
});

// Function to display user information in the HTML
function displayUserInfo(userData) {
  const userInfoDiv = document.getElementById('user-info');

  if (userData && userData.name && userData.surname && userData.email && userData.last_login) {
    // User data is available
    userInfoDiv.innerHTML = `
      <p><strong>სახელი:</strong> ${userData.name}</p>
      <p><strong>გვარი:</strong> ${userData.surname}</p>
      <p><strong>Email:</strong> ${userData.email}</p>
      
    `;
  } else {
    // User data is not fully available
    userInfoDiv.innerHTML = '<p>No complete user data found. Please update your profile.</p>';
  }
}

// ... (Your existing code)

// Get reference to the logout button
const logoutButton = document.getElementById('logout-btn');



// Add click event listener to the logout button
logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  // Sign out the user
  auth.signOut().then(() => {
    // Clear user data from localStorage
    localStorage.removeItem('userData');
    console.log('User signed out successfully.');
  }).catch((error) => {
    console.error('Error signing out:', error);
  });
});

// ... (Your existing code)
