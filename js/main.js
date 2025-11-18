// Cart management using localStorage
class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem('fashionBoutiqueCart')) || [];
    this.updateCartCount();
  }

  addItem(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = this.cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.saveCart();
    this.updateCartCount();
    this.showNotification(`${product.name} added to cart!`);
  }

  removeItem(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    this.updateCartCount();
    this.renderCart();
  }

  updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      this.removeItem(productId);
      return;
    }

    const item = this.cart.find(item => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
      this.saveCart();
      this.renderCart();
    }
  }

  getTotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  saveCart() {
    localStorage.setItem('fashionBoutiqueCart', JSON.stringify(this.cart));
  }

  updateCartCount() {
    const count = this.cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => el.textContent = count);
  }

  renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');

    if (!cartItems) return;

    if (this.cart.length === 0) {
      cartItems.innerHTML = '<p>Your cart is empty.</p>';
      if (cartSummary) cartSummary.innerHTML = '';
      return;
    }

    cartItems.innerHTML = this.cart.map(item => `
      <div class="cart-line">
        <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
        <div style="flex: 1;">
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)} each</p>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="btn quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="btn quantity-btn" data-action="increase" data-id="${item.id}">+</button>
        </div>
        <div style="text-align: right;">
          <p><strong>$${(item.price * item.quantity).toFixed(2)}</strong></p>
          <button class="btn btn-contact" onclick="cartManager.removeItem(${item.id})">Remove</button>
        </div>
      </div>
    `).join('');

    if (cartSummary) {
      cartSummary.innerHTML = `
        <div style="margin-top: 20px; padding: 16px; background: #f7f7f8; border-radius: 8px;">
          <h3>Total: $${this.getTotal().toFixed(2)}</h3>
        </div>
      `;
    }
  }

  generateWhatsAppMessage() {
    if (this.cart.length === 0) return '';

    let message = 'Hello! I\'d like to order the following items:\n\n';
    this.cart.forEach(item => {
      message += `${item.name} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\nTotal: $${this.getTotal().toFixed(2)}\n\nPlease confirm availability and delivery details.`;

    return encodeURIComponent(message);
  }

  showNotification(message) {
    // Simple notification
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff6b95;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  }
}

// Initialize cart manager
const cartManager = new CartManager();

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Add to cart buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-add')) {
      const productId = parseInt(e.target.dataset.id);
      cartManager.addItem(productId);
    }

    // Quantity buttons
    if (e.target.classList.contains('quantity-btn')) {
      const action = e.target.dataset.action;
      const productId = parseInt(e.target.dataset.id);
      const item = cartManager.cart.find(item => item.id === productId);
      if (item) {
        const newQuantity = action === 'increase' ? item.quantity + 1 : item.quantity - 1;
        cartManager.updateQuantity(productId, newQuantity);
      }
    }
  });

  // Render cart on cart page
  if (document.getElementById('cart-items')) {
    cartManager.renderCart();
  }

  // WhatsApp checkout
  const whatsappBtn = document.getElementById('checkout-whatsapp');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const message = cartManager.generateWhatsAppMessage();
      if (message) {
        window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
      } else {
        alert('Your cart is empty!');
      }
    });
  }

  // Instagram link (placeholder)
  const instagramLink = document.getElementById('instagram-link');
  if (instagramLink) {
    instagramLink.href = 'https://instagram.com/yourfashionboutique';
  }
});

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  .nav-links.active {
    display: flex !important;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #0f1724;
    padding: 16px;
  }
  @media (min-width: 768px) {
    .nav-links.active {
      position: static;
      flex-direction: row;
      background: transparent;
      padding: 0;
    }
  }
`;
document.head.appendChild(style);
