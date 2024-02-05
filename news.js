import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js';

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

// Initialize Firestore and Storage
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

document.getElementById('newsForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const imageFile = document.getElementById('image').files[0];

  try {
    // Upload image to Firebase Storage
    const imageRef = ref(storage, `images/${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    const imageUrl = await getDownloadURL(imageRef);

    // Add news data to Firestore
    await addDoc(collection(db, 'news'), {
      title: title,
      content: content,
      imageUrl: imageUrl,
      timestamp: serverTimestamp()
    });

    // Clear the form after submission
    document.getElementById('newsForm').reset();
  } catch (error) {
    console.error("Error adding news:", error);
  }
});
