// This file manages the cart state using localStorage
// It's included in both index.html and pizza.html

let cart = JSON.parse(localStorage.getItem('foodCart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

function addToCart(name, price) {
    let found = cart.find(i => i.name === name);
    if (found) {
        found.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    
    // Save the updated cart to localStorage
    localStorage.setItem('foodCart', JSON.stringify(cart));
    
    updateCartCount();
    alert(name + " added to cart!");
}

function updateCartCount() {
    let count = cart.reduce((a, b) => a + b.qty, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = count;
    }
}

function openCart() {
    document.getElementById('cartModal').style.display = 'flex';
    renderCart();
}

function renderCart() {
    let cartTable = document.getElementById('cart-items');
    cartTable.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        let price = item.price * item.qty;
        total += price;
        cartTable.innerHTML += `<tr><td>${item.name}</td><td>${item.qty}</td><td>₹${price}</td></tr>`;
    });
    document.getElementById('cart-total').innerText = total;
}

function showThankYou() {
    document.getElementById('cartModal').style.display = 'none';
    document.getElementById('thankyou-section').style.display = 'flex';
    
    // Clear the cart after the order is completed
    localStorage.removeItem('foodCart');
    cart = [];
    updateCartCount();
    
    createConfetti();
}

function hideThankYou() {
    document.getElementById('thankyou-section').style.display = 'none';
    window.location.href = 'index.html'; 
}

function createConfetti() {
    const confetti = document.querySelector('.confetti');
    if (!confetti) return;
    confetti.innerHTML = '';
    for (let i = 0; i < 100; i++) {
        const piece = document.createElement('div');
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.background = `hsl(${Math.random() * 360},100%,50%)`;
        piece.style.animation = `fall ${Math.random() * 2 + 2}s linear infinite`;
        piece.style.opacity = Math.random();
        confetti.appendChild(piece);
    }
}
