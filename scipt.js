import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import { getFirestore, collection, addDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);

window.sendOTP = function() {
  const phone = document.getElementById("phone").value;
  window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, phone, appVerifier)
    .then(confirmationResult => {
      window.confirmationResult = confirmationResult;
      alert("📩 OTP Sent!");
    })
    .catch(error => {
      console.error(error);
      alert("Error sending OTP!");
    });
};

window.verifyOTP = function() {
  const otp = document.getElementById("otp").value;
  confirmationResult.confirm(otp).then(() => {
    alert("✅ Login Successful!");
    window.location.href = "index.html"; // Go to user home
  }).catch(() => {
    alert("❌ Invalid OTP!");
  });
};

// Cart & Order Functions (same as before)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

window.addToCart = function(item, price) {
  const found = cart.find(c => c.item === item);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ item, price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${item} added to cart!`);
  window.location.href = "cart.html";
};

function loadCart() {
  const tableBody = document.querySelector("#cartTable tbody");
  if (!tableBody) return;
  tableBody.innerHTML = "";
  let total = 0;

  cart.forEach((c, index) => {
    const row = document.createElement("tr");
    const itemTotal = c.price * c.qty;
    total += itemTotal;

    row.innerHTML = `
      <td>${c.item}</td>
      <td>
        <button onclick="changeQty(${index}, -1)">-</button>
        ${c.qty}
        <button onclick="changeQty(${index}, 1)">+</button>
      </td>
      <td>₹${c.price}</td>
      <td>₹${itemTotal}</td>
      <td><button onclick="removeItem(${index})">❌</button></td>
    `;
    tableBody.appendChild(row);
  });

  document.getElementById("totalAmount").textContent = `Total: ₹${total}`;
}

window.changeQty = function(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
};

window.removeItem = function(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
};

window.checkout = async function() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
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
    alert("✅ Order Placed Successfully!");
    cart = [];
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  } catch (err) {
    console.error(err);
    alert("Error placing order!");
  }
};

loadCart();


