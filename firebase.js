<script type="module">
// Firebase Config (Common for all pages)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, addDoc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCblVFb8ZauMSewDyDDcIAHxILBxXq7_hI",
  authDomain: "food-court-c8a15.firebaseapp.com",
  projectId: "food-court-c8a15",
  storageBucket: "food-court-c8a15.firebasestorage.app",
  messagingSenderId: "815353079827",
  appId: "1:815353079827:web:13adeed5eeb3ceec0977e6",
  measurementId: "G-0JT07G04MJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export { RecaptchaVerifier, signInWithPhoneNumber, addDoc, collection, onSnapshot };
</script>
