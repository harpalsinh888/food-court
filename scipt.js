import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCblVFb8ZauMSewDyDDcIAHxILBxXq7_hI",
  authDomain: "food-court-c8a15.firebaseapp.com",
  projectId: "food-court-c8a15",
  storageBucket: "food-court-c8a15.firebasestorage.app",
  messagingSenderId: "815353079827",
  appId: "1:815353079827:web:13adeed5eeb3ceec0977e6",
  measurementId: "G-0JT07G04MJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let cart = [];

window.addToCart = function(item, price) {
  const found = cart.find(c => c.item === item);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ item, price, qty: 1 });
  }
  alert(`${item} added to cart!`);
};

window.placeOrder = async function() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  try {
    for (const c of cart) {
      await addDoc(collection(db, "orders"), {
        item: c.item,
        quantity: c.qty,
        price: c.price * c.qty,
        time: new Date()
      });
    }
    alert("✅ Order Saved in Firebase!");
    cart = [];
  } catch (err) {
    console.error(err);
    alert("Error saving order!");
  }
};
