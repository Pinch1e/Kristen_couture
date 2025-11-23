// Vanilla JS for enhanced ecommerce interactivity and animations

document.addEventListener('DOMContentLoaded', () => {
  /* Elements */
  const productGrid = document.querySelector('.product-grid');
  const searchInput = document.getElementById('search');
  const searchSuggestions = document.getElementById('search-suggestions');
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.getElementById('primary-navigation');
  const cartCount = document.getElementById('cart-count');

  /* State */
  let products = [];
  let cart = {};

  /* Fetch products data */
  fetch('data/products.json')
    .then(res => res.json())
    .then(data => {
      products = data;
      renderProducts(products);
      updateCartCount();
    })
    .catch(err => console.error('Failed to load products:', err));

  /* Render product cards */
  function renderProducts(items) {
    if (!productGrid) return;
    productGrid.innerHTML = '';
    items.forEach(product => {
      const card = createProductCard(product);
      productGrid.appendChild(card);
    });
    applyFadeInAnimation();
  }

  /* Create a single product card element */
  function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card fade-in';
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', product.title);

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;
    img.loading = 'lazy';
    card.appendChild(img);

    const title = document.createElement('h2');
    title.className = 'product-title';
    title.textContent = product.title;
    card.appendChild(title);

    const priceContainer = document.createElement('div');
    priceContainer.className = 'price-container';

    const price = document.createElement('span');
    price.className = 'product-price';
    price.textContent = `$${product.price.toFixed(2)}`;
    priceContainer.appendChild(price);

    if (product.oldPrice) {
      const oldPrice = document.createElement('span');
      oldPrice.className = 'product-old-price';
      oldPrice.textContent = `$${product.oldPrice.toFixed(2)}`;
      priceContainer.appendChild(oldPrice);
    }
    card.appendChild(priceContainer);

    // Add to cart button
    const addBtn = document.createElement('button');
    addBtn.className = 'add-to-cart-btn';
    addBtn.textContent = 'Add to Cart';
    addBtn.addEventListener('click', () => {
      addToCart(product.id);
    });
    card.appendChild(addBtn);

    // Wishlist heart icon
    const wishlistBtn = document.createElement('button');
    wishlistBtn.className = 'wishlist-btn';
    wishlistBtn.setAttribute('aria-label', 'Add to wishlist');
    wishlistBtn.innerHTML = '♡';
    wishlistBtn.addEventListener('click', () => {
      wishlistBtn.classList.toggle('active');
      wishlistBtn.innerHTML = wishlistBtn.classList.contains('active') ? '♥' : '♡';
    });
    card.appendChild(wishlistBtn);

    // Zoom image on hover
    card.addEventListener('mouseenter', () => {
      img.style.transform = 'scale(1.08)';
    });
    card.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
    });

    return card;
  }

  /* Add product to cart with localStorage persistence */
  function addToCart(productId) {
    loadCart();
    cart[productId] = (cart[productId] || 0) + 1;
    saveCart();
    updateCartCount();
    showToast('Product added to cart');
  }

  /* Load cart from localStorage */
  function loadCart() {
    const stored = localStorage.getItem('cart');
    cart = stored ? JSON.parse(stored) : {};
  }

  /* Save cart to localStorage */
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  /* Update cart item count in header */
  function updateCartCount() {
    loadCart();
    const count = Object.values(cart).reduce((acc, qty) => acc + qty, 0);
    if (cartCount) cartCount.textContent = count;
  }

  /* Search bar predictive suggestions */
  if (searchInput && searchSuggestions) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim().toLowerCase();
      if (query.length < 2) {
        searchSuggestions.classList.remove('active');
        searchSuggestions.innerHTML = '';
        return;
      }
      const matches = products.filter(p =>
        p.title.toLowerCase().includes(query)
      ).slice(0, 5);

      if (matches.length === 0) {
        searchSuggestions.innerHTML = '<div class="no-results">No results</div>';
        searchSuggestions.classList.add('active');
        return;
      }

      searchSuggestions.innerHTML = matches.map(p =>
        `<div tabindex="0" role="option" data-id="${p.id}">${p.title}</div>`
      ).join('');
      searchSuggestions.classList.add('active');

      const options = searchSuggestions.querySelectorAll('div');
      options.forEach(option => {
        option.addEventListener('click', () => {
          window.location.href = `product.html?id=${option.dataset.id}`;
        });
        option.addEventListener('keydown', e => {
          if (e.key === 'Enter') {
            window.location.href = `product.html?id=${option.dataset.id}`;
          }
        });
      });
    });

    document.addEventListener('click', (e) => {
      if (!searchSuggestions.contains(e.target) && e.target !== searchInput) {
        searchSuggestions.classList.remove('active');
      }
    });
  }

  /* Toggle mobile menu */
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !expanded);
      mainNav.classList.toggle('active');
    });
  }

  /* Smooth scroll fade-in animations */
  function applyFadeInAnimation() {
    if (!('IntersectionObserver' in window)) {
      // Fallback, just make visible
      document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });
  }

  /* Toast notification */
  function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.setAttribute('role', 'alert');
      toast.setAttribute('aria-live', 'assertive');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

});
