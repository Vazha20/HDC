// Import Firebase modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';
// news.js

// Firebase project configuration
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
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);


document.addEventListener('DOMContentLoaded', async function () {
  // Reference to the news container
  const newsContainer = document.getElementById('newsContainer');

  // Event listener for form submission
  document.getElementById('newsForm').addEventListener('submit', async function (event) {
      event.preventDefault();

      const title = document.getElementById('title').value;
      const text = document.getElementById('text').value;
      const imageFile = document.getElementById('image').files[0];

      try {
          // Upload image to Firebase Storage
          const imageRef = ref(storage, `images/${imageFile.name}`);
          await uploadBytes(imageRef, imageFile);
          const imageUrl = await getDownloadURL(imageRef);

          // Add news data to Firestore
          await addDoc(collection(db, 'news'), {
              title: title,
              text: text,
              imageUrl: imageUrl,
              timestamp: serverTimestamp()
          });

          // Clear the form after submission
          document.getElementById('newsForm').reset();
      } catch (error) {
          console.error("Error adding news:", error);
      }
  });

  try {
      // Fetch news data from Firestore
      const newsCollection = collection(db, 'news');
      const newsSnapshot = await getDocs(newsCollection);
      const newsList = newsSnapshot.docs.map(doc => doc.data());

      // Display news in the HTML
      newsList.forEach(news => {
          const newsCard = createNewsCard(news);
          newsContainer.appendChild(newsCard);
      });
  } catch (error) {
      console.error("Error fetching news:", error);
  }
});

// Function to create a news card element
function createNewsCard(news) {
  const newsCard = document.createElement('div');
  newsCard.classList.add('news-card');

  // Add news details to the card
  newsCard.innerHTML = `
  <div class="container">
  
      <h2>${news.title}</h2>
      <p>Timestamp: ${new Date(news.timestamp.toMillis()).toLocaleString()}</p>
      
      <img width="200px" src="${news.imageUrl}" alt="News Image">
      <p>${news.text}</p>
 
      </div>
      
  `;


  return newsCard;
}

