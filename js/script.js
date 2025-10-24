// --- SESSION STORAGE CART ---
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

// --- ADD TO CART ---
function addToCart(item) {
    cart.push(item);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added.');
}

// Attach Add to Cart buttons dynamically
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Get the row containing the button
        const row = button.closest('tr');
        const title = row.querySelector('td:nth-child(2)').textContent;
        const description = row.querySelector('td:nth-child(3)').textContent;
        addToCart({ title, description });
    });
});

// --- VIEW CART MODAL ---
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
            li.innerHTML = `<strong>${item.title}</strong>: ${item.description}`;
            cartItems.appendChild(li);
        });
    }
}

// --- CLEAR CART ---
clearBtn.onclick = function() {
    cart = [];
    sessionStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    alert('Cart cleared.');
}

// --- PROCESS ORDER ---
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

// --- SUBSCRIBE FORM ---
document.getElementById('footer-email')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('footer-email').value;
    if(email) {
        alert(`Thank you for subscribing, ${email}!`);
        document.getElementById('footer-email').reset();
    }
});
