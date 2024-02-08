import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getFirestore, collection, serverTimestamp, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js';

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
