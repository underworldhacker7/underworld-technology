 // Import the functions you need from the SDKs you need
  import e from "cors";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
   import{getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
    import { getFirestore, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
  const firebaseConfig = {
    apiKey: "AIzaSyBjg4BmX1t0kPPZHBgn39qMh0KxLXGdnxY",
    authDomain: "login-37da6.firebaseapp.com",
    projectId: "login-37da6",
    storageBucket: "login-37da6.firebasestorage.app",
    messagingSenderId: "976257188489",
    appId: "1:976257188489:web:8ea88e1e7c33f4a1867c58"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  function showMessage(message,divId) {
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function() {
        messageDiv.style.opacity = 0;
  },5000);}
  const signUpForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  // Assuming you have a signup button with id="signup-btn"
  const signupBtn = document.getElementById("submit-btn");
  signupBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const auth = getAuth(app);
    const db = getFirestore(app);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const userData = {
        email: user.email,
        uid: user.uid
      };
      showMessage("User created successfully!", 'signup-message');
      const docRef =Doc(db, "users", user.uid);
      setDoc(docRef, userData)
        .then(() => {
          console.log("User data saved to Firestore");
        })
        .catch((error) => {
          console.error("Error saving user data to Firestore:", error);
        });
    })
.catch((error) => {
    const errorCode = error.code;
    if (
        errorCode === 'auth/email-already-in-use'
    ) {
        showMessage("Email is already in use", 'signup-message');
    } else {
        showMessage("Error creating user: " + error.message, 'signup-message');
    }  });
});