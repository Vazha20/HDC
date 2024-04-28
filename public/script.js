import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getFirestore, collection, serverTimestamp, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

// Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwRlbzwHclIcvK_aLmFKrrtH8yfJahzDU",
  authDomain: "hdcenter00.firebaseapp.com",
  projectId: "hdcenter00",
  storageBucket: "hdcenter00.appspot.com",
  messagingSenderId: "737981264374",
  appId: "1:737981264374:web:d831dd29e0a0005762d7d7",
  measurementId: "G-VS1M2025KW"
};
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const auth = getAuth(firebaseApp);


document.addEventListener('DOMContentLoaded', async function () {
  const newsContainer = document.getElementById('newsContainer');
  let lastTimestamp = null; // Variable to store the timestamp of the last displayed news item
  let newsRendered = 0; // Variable to track the number of news items rendered

  // Function to render news cards
  function renderNews(news) {
    if (newsRendered < 2) { // Render only if less than 2 news items are rendered
      const newsCard = createNewsCard(news);
      newsContainer.appendChild(newsCard);
      newsRendered++;
    }
  }

  // Function to fetch news data from Firestore
  async function fetchNews() {
    const newsCollection = collection(db, 'news');
    
    // Fetch only news items with timestamp greater than the last displayed news item
    let query = lastTimestamp ? collection(db, 'news').orderBy('timestamp').startAfter(lastTimestamp) : newsCollection;
    
    const newsSnapshot = await getDocs(query);
    newsSnapshot.forEach(doc => {
      renderNews(doc.data());
      lastTimestamp = doc.data().timestamp.toMillis(); // Update lastTimestamp to the latest news item's timestamp
    });
  }

  // Fetch initial news data
  await fetchNews();
});

// Function to create a news card element
function createNewsCard(news) {
  const newsCard = document.createElement('div');
  newsCard.classList.add('news-card');

  // Add news details to the card
  newsCard.innerHTML = `
   <div>
      <h2 class="mt-3">${news.title}</h2>
      <p>თარიღი: ${new Date(news.timestamp.toMillis()).toLocaleString()}</p>
      <img width="500px" src="${news.imageUrl}" alt="News Image">
      <p>${news.text}</p>
   </div>
  `;

  return newsCard;
}
