// --- SESSION STORAGE CART ---
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

// --- ADD TO CART ---
function addToCart(item) {
    cart.push(item);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added.');
}

// Attach Add to Cart buttons dynamically (Gallery page only)
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const row = button.closest('tr');
        const title = row.querySelector('td:nth-child(2)').textContent;
        const description = row.querySelector('td:nth-child(3)').textContent;
        addToCart({ title, description });
    });
});

// --- VIEW CART MODAL (Gallery page only) ---
const btn = document.getElementById('view-cart-btn');
const modal = document.getElementById('cart-modal');
const span = document.getElementsByClassName('close')[0];
const cartItems = document.getElementById('cart-items');
const clearBtn = document.getElementById('clear-cart');
const processBtn = document.getElementById('process-order');

if (btn && modal && span && cartItems && clearBtn && processBtn) {
    // Show modal
    btn.onclick = function() {
        displayCart();
        modal.style.display = 'block';
    }

    // Close modal
    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if(event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // Display cart items
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

    // Clear cart
    clearBtn.onclick = function() {
        cart = [];
        sessionStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
        alert('Cart cleared.');
    }

    // Process order
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
}

// --- CUSTOM ORDER / FEEDBACK FORM (About Us page) ---
const customForm = document.getElementById('custom-order-form');

if (customForm) {
    customForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill out all fields.');
            return;
        }

        const entry = { name, email, message };
        let orders = JSON.parse(localStorage.getItem('customOrders')) || [];
        orders.push(entry);
        localStorage.setItem('customOrders', JSON.stringify(orders));

        alert('Thank you! Your feedback/order has been submitted.');
        customForm.reset();
    });
}

// --- FOOTER SUBSCRIBE FORM ---
const subscribeForm = document.getElementById('footer-email');

if (subscribeForm) {
    subscribeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = subscribeForm.value.trim();

        // Simple email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            alert('Please enter your email address.');
        } else if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
        } else {
            alert(`Thank you for subscribing, ${email}!`);
            subscribeForm.value = '';
        }
    });
}
