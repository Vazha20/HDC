import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js';
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
  const newsForm = document.getElementById('newsForm');
  const newsList = [];

  // Function to render news cards
  function renderNews(news) {
    const newsCard = createNewsCard(news);
    newsContainer.appendChild(newsCard);
  }

  // Function to fetch news data from Firestore
  async function fetchNews() {
    const newsCollection = collection(db, 'news');
    const newsSnapshot = await getDocs(newsCollection);
    newsSnapshot.forEach(doc => {
      newsList.push(doc.data());
    });
  }

  // Function to handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const text = document.getElementById('text').value;
    const imageFile = document.getElementById('image').files[0];

    try {
      const user = auth.currentUser;
      if (user) {
        const imageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        const imageUrl = await getDownloadURL(imageRef);

        await addDoc(collection(db, 'news'), {
          title: title,
          text: text,
          imageUrl: imageUrl,
          timestamp: serverTimestamp(),
          createdBy: user.uid // Store the user ID who added the news
        });

        // Clear the form after submission
        newsForm.reset();
      } else {
        console.error("User not authenticated.");
        // Handle user not authenticated scenario
      }
    } catch (error) {
      console.error("Error adding news:", error);
    }
  }

  // Event listener for form submission
  newsForm.addEventListener('submit', handleSubmit);

  // Function to handle lazy loading of images
  function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('.lazy');
    lazyImages.forEach(image => {
      if (image.offsetTop < window.innerHeight + window.pageYOffset) {
        image.src = image.dataset.src;
        image.classList.remove('lazy');
      }
    });
  }

  // Function to handle pagination
  function handlePagination() {
    const scrollPosition = window.innerHeight + window.pageYOffset;
    if (scrollPosition >= document.body.scrollHeight) {
      const nextPage = newsList.splice(0, 5); // Load 5 news items per page
      nextPage.forEach(news => renderNews(news));
    }
  }

  // Event listener for scroll to trigger pagination
  window.addEventListener('scroll', handlePagination);

  // Fetch initial news data
  await fetchNews();

  // Render initial news items
  const initialNews = newsList.splice(0, 5); // Load 5 news items initially
  initialNews.forEach(news => renderNews(news));

  // Lazy load images initially and on window scroll
  lazyLoadImages();
  window.addEventListener('scroll', lazyLoadImages);

  //i want here loading before page load
  auth.onAuthStateChanged(user => {
    if (user) {
      // User is signed in, show the news form
      newsForm.style.display = 'block';
    } else {
      // No user is signed in, hide the news form
      newsForm.style.display = 'none';
    }
  });
});

// Function to create a news card element
function createNewsCard(news) {
  const newsCard = document.createElement('div');
  newsCard.classList.add('news-card');

  // Add news details to the card
  newsCard.innerHTML = `
   <div>
      <h2 class="mt-5">${news.title}</h2>
      <p>თარიღი: ${new Date(news.timestamp.toMillis()).toLocaleString()}</p>
      <img width="350px" src="${news.imageUrl}" alt="News Image" class="lazy" data-src="${news.imageUrl}">
      <p>${news.text}</p>
      </div>
  `;

  return newsCard;
}