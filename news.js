// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';

// Initialize Firebase with your project config
const firebaseConfig = {
  // Your Firebase config here
};

const firebaseApp = initializeApp(firebaseConfig);

// Get references to authentication and firestore
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Authentication state change listener
onAuthStateChanged(auth, user => {
  const authSection = document.getElementById('auth-section');
  const newsSection = document.getElementById('news-section');

  if (user) {
    authSection.innerHTML = `<h2>Welcome, ${user.email}!</h2>`;
    authSection.innerHTML += '<button onclick="signOut()">Sign Out</button>';
    newsSection.style.display = 'block';
    displayNewsFeed();
  } else {
    authSection.innerHTML = '<h2>Authentication</h2>';
    authSection.innerHTML += '<button onclick="signIn()">Sign In</button>';
    newsSection.style.display = 'none';
  }
});

// Sign In function
function signIn() {
  const email = prompt('Enter your email:');
  const password = prompt('Enter your password:');

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log('User signed in:', auth.currentUser.email);
    })
    .catch(error => {
      console.error('Sign in error:', error.message);
    });
}

// Sign Out function
function signOutUser() {
  signOut(auth)
    .then(() => {
      console.log('User signed out.');
    })
    .catch(error => {
      console.error('Sign out error:', error.message);
    });
}

// Add News function
function addNews() {
  const title = document.getElementById('title').value;
  const photoUrl = document.getElementById('photoUrl').value;
  const text = document.getElementById('text').value;

  const user = auth.currentUser;

  if (user) {
    // Create a new document in the 'news' collection
    addDoc(collection(db, 'news'), {
      title: title,
      photoUrl: photoUrl,
      text: text,
      author: user.uid,
      date: new Date()
    })
    .then(() => {
      console.log('News article added.');
      displayNewsFeed();
    })
    .catch(error => {
      console.error('Error adding news article:', error);
    });
  } else {
    console.error('User not authenticated.');
  }
}

// Display News Feed function
function displayNewsFeed() {
  const newsFeed = document.getElementById('news-feed');

  // Clear previous entries
  newsFeed.innerHTML = '';

  // Get news articles from Firestore
  getDocs(collection(db, 'news'))
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const data = doc.data();
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <strong>${data.title}</strong><br>
          <img src="${data.photoUrl}" alt="News Image" style="max-width: 300px;"><br>
          ${data.text}<br>
          <em>Author: ${data.author}</em><br>
          <em>Date: ${data.date.toLocaleString()}</em>
        `;
        newsFeed.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error getting news articles:', error);
    });
}
