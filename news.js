// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyByvcMwXGwxvbhoW6Ys6ip0udq1ZuM1bpA",
  authDomain: "hdc-project111.firebaseapp.com",
  projectId: "hdc-project111",
  storageBucket: "hdc-project111.appspot.com",
  messagingSenderId: "1031505541323",
  appId: "1:1031505541323:web:5abcd1ae3ff98c62f7834e",
  measurementId: "G-93VP5RG2GP"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the storage service
  var storage = firebase.storage();
  

function uploadFile() {
    // Get the file input element
    var fileInput = document.getElementById("fileInput");
    
    // Get the file
    var file = fileInput.files[0];
  
    // Check if a file is selected
    if (file) {
      // Create a storage reference
      var storageRef = storage.ref('uploads/' + file.name);
  
      // Upload file
      var uploadTask = storageRef.put(file);
  
      // Monitor the upload progress
      uploadTask.on('state_changed',
        function(snapshot){
          // Progress callback
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        function(error) {
          // Error callback
          console.error('Error uploading file:', error);
        },
        function() {
          // Success callback
          console.log('File uploaded successfully');
          // You can perform additional actions here, such as updating the database with the file URL
        }
      );
    } else {
      console.error('No file selected');
    }
  }
