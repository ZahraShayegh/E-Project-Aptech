// Load cart from localStorage
function loadCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart badge in navbar
function updateCartCount() {
  const cart = loadCart();
  let count = 0;
  cart.forEach(item => count += item.quantity);
  
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = count;
}

// Add item to cart
function addToCart(product) {
  let cart = loadCart();

  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  saveCart(cart);
  updateCartCount();
  showToast();
}
function showToast() {
  const toastEl = document.getElementById('cart-toast');
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  const buttons = document.querySelectorAll('.add-to-cart-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const product = {
        id: button.getAttribute('data-id'),
        name: button.getAttribute('data-name'),
        price: parseFloat(button.getAttribute('data-price'))
      };
      addToCart(product);
    });
  });
});

