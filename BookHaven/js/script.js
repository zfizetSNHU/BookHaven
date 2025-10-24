// Session Storage Cart
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

// Add to Cart
function addToCart(itemName) {
    cart.push(itemName);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added.');
}

// View Cart Modal
const modal = document.getElementById('cart-modal');
const btn = document.getElementById('view-cart-btn');
const span = document.getElementsByClassName('close')[0];
const cartItems = document.getElementById('cart-items');
const clearBtn = document.getElementById('clear-cart');
const processBtn = document.getElementById('process-order');

btn.onclick = function() {
    displayCart();
    modal.style.display = 'block';
}

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if(event.target === modal) {
        modal.style.display = 'none';
    }
}

function displayCart() {
    cartItems.innerHTML = '';
    if(cart.length === 0) {
        cartItems.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach(item => {
            let li = document.createElement('li');
            li.textContent = item;
            cartItems.appendChild(li);
        });
    }
}

// Clear Cart
clearBtn.onclick = function() {
    cart = [];
    sessionStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    alert('Cart cleared.');
}

// Process Order
processBtn.onclick = function() {
    if(cart.length > 0) {
        alert('Thank you for your order!');
        cart = [];
        sessionStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    } else {
        alert('Your cart is empty.');
    }
}

// Subscribe Form
document.getElementById('subscribe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    if(email) {
        alert(`Thank you for subscribing, ${email}!`);
        document.getElementById('subscribe-form').reset();
    }
});
