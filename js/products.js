// Product data array - grouped by product name with multiple images
const products = [
  {
    id: 1,
    name: "Adaeze Collection",
    price: 129.99,
    images: ["images/adaeze.jpg", "images/adaeze2.jpg"],
    description: "Elegant and sophisticated dress collection with intricate detailing."
  },
  {
    id: 2,
    name: "Amira Collection",
    price: 89.99,
    images: ["images/amira.jpg", "images/amira2.jpg"],
    description: "Modern and chic outfit collection for everyday elegance."
  },
  {
    id: 3,
    name: "Annabelle Collection",
    price: 159.99,
    images: ["images/Annabelle (1).jpg", "images/Annabelle (5).JPG", "images/Annabelle (6).JPG", "images/Annabelle (7).jpg", "images/Annabelle (8).jpg", "images/Annabelle (9).jpg"],
    description: "Beautifully crafted dress collection with flowing silhouettes."
  },
  {
    id: 4,
    name: "Ariki Collection",
    price: 139.99,
    images: ["images/arike.jpg", "images/arike2.jpg"],
    description: "Bold and vibrant dress collection for making a statement."
  },
  {
    id: 5,
    name: "Bee Collection",
    price: 99.99,
    images: ["images/Bee (1).jpg", "images/Bee (3).jpg", "images/Bee (4).JPG"],
    description: "Playful and trendy outfit collection for casual outings."
  },
  {
    id: 6,
    name: "Butler Collection",
    price: 249.99,
    images: ["images/Butler (1).jpg", "images/Butler (2).jpg", "images/Butler (3).JPG"],
    description: "Luxurious jacket collection with premium tailoring."
  },
  {
    id: 7,
    name: "Diane Collection",
    price: 189.99,
    images: ["images/Diane (1).jpg", "images/Diane (2).JPG", "images/Diane (3).jpg"],
    description: "Graceful dress collection with exquisite craftsmanship."
  },
  {
    id: 8,
    name: "Ego Oyibo Collection",
    price: 299.99,
    images: ["images/Ego Oyibo (1).jpg", "images/Ego Oyibo (2).JPG", "images/Ego Oyibo (3).JPG", "images/Ego Oyibo (4).jpg"],
    description: "Opulent gown collection for red carpet moments."
  },
  {
    id: 9,
    name: "Emerald Collection",
    price: 219.99,
    images: ["images/Emerald (1).JPG", "images/Emerald (2).jpg", "images/Emerald (3).jpg"],
    description: "Emerald-inspired ensemble collection with rich textures."
  },
  {
    id: 10,
    name: "Ezzy Collection",
    price: 179.99,
    images: ["images/Ezzy (1).jpg", "images/Ezzy (4).JPG", "images/Ezzy (5).jpg", "images/Ezzy (6).JPG"],
    description: "Effortless dress collection with modern elegance."
  },
  {
    id: 11,
    name: "Jasmine Collection",
    price: 129.99,
    images: ["images/Jasmine (1).jpg", "images/Jasmine (2).jpg", "images/Jasmine (3).JPG"],
    description: "Fresh and floral-inspired outfit collection."
  },
  {
    id: 12,
    name: "Lavish Collection",
    price: 349.99,
    images: ["images/Lavish (1).jpg", "images/Lavish (2).jpg"],
    description: "Lavish gown collection for unforgettable events."
  },
  {
    id: 13,
    name: "New Wine Collection",
    price: 199.99,
    images: ["images/New Wine (1).jpg", "images/New Wine (2).jpg"],
    description: "Wine-inspired dress collection with deep, rich tones."
  },
  {
    id: 14,
    name: "Pearl Collection",
    price: 229.99,
    images: ["images/Pearl (1).jpg", "images/Pearl (4).jpg", "images/Pearl (5).JPG", "images/Pearl (6).jpg"],
    description: "Pearl-adorned collection for classic beauty."
  },
  {
    id: 15,
    name: "Sophia Collection",
    price: 169.99,
    images: ["images/Sophia (1).JPG", "images/Sophia (2).jpg"],
    description: "Sophisticated dress collection with refined details."
  },
  {
    id: 16,
    name: "Tinker Bell Collection",
    price: 149.99,
    images: ["images/Tinker Bell (1).jpg", "images/Tinker Bell (4).jpg", "images/Tinker Bell (5).JPG", "images/Tinker Bell (6).jpg"],
    description: "Whimsical outfit collection inspired by fairy tales."
  },
  {
    id: 17,
    name: "Vantage Collection",
    price: 279.99,
    images: ["images/Vantage (1).jpg", "images/Vantage (2).jpg", "images/Vantage (3).jpg", "images/Vantage (4).JPG"],
    description: "Strategic jacket collection for versatile styling."
  },
  {
    id: 18,
    name: "Yolanda Collection",
    price: 189.99,
    images: ["images/Yolanda (1).jpeg", "images/Yolanda (2).jpeg"],
    description: "Bold dress collection with striking patterns."
  },
  {
    id: 19,
    name: "Zara Collection",
    price: 199.99,
    images: ["images/Zara (1).jpg", "images/Zara (2).jpg"],
    description: "Zara-inspired ensemble collection for modern women."
  },
  {
    id: 20,
    name: "Zoe Collection",
    price: 159.99,
    images: ["images/Zoe (1).jpg", "images/Zoe (2).jpg", "images/Zoe (3).jpg"],
    description: "Zoe collection with contemporary flair."
  }
];

// Function to render products into a grid with slideshow for multiple images
function renderProducts(gridId, productList) {
  const grid = document.getElementById(gridId);
  if (!grid) return;

  grid.innerHTML = productList.map(product => {
    const hasMultipleImages = product.images && product.images.length > 1;
    const mainImage = hasMultipleImages ? product.images[0] : product.image;

    return `
      <div class="product-card">
        <div class="product-media">
          ${hasMultipleImages ? `
            <div class="image-slideshow">
              ${product.images.map((img, index) => `
                <img src="${img}" alt="${product.name} - View ${index + 1}" loading="lazy" class="${index === 0 ? 'active' : ''}">
              `).join('')}
              <button class="slide-btn prev-btn" data-id="${product.id}">‹</button>
              <button class="slide-btn next-btn" data-id="${product.id}">›</button>
              <div class="slide-indicators">
                ${product.images.map((_, index) => `
                  <span class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}" data-id="${product.id}"></span>
                `).join('')}
              </div>
            </div>
          ` : `
            <img src="${mainImage}" alt="${product.name}" loading="lazy">
          `}
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <div class="product-actions">
            <button class="btn btn-add" data-id="${product.id}">Add to Cart</button>
            <button class="btn btn-contact">Contact</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Add slideshow functionality
  initializeSlideshows();
}

// Slideshow functionality
function initializeSlideshows() {
  document.querySelectorAll('.image-slideshow').forEach(slideshow => {
    const productId = slideshow.querySelector('.slide-btn').dataset.id;
    const images = slideshow.querySelectorAll('img');
    const indicators = slideshow.querySelectorAll('.indicator');
    let currentIndex = 0;

    function showSlide(index) {
      images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
      });
      indicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
      });
      currentIndex = index;
    }

    // Previous button
    slideshow.querySelector('.prev-btn').addEventListener('click', () => {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
      showSlide(newIndex);
    });

    // Next button
    slideshow.querySelector('.next-btn').addEventListener('click', () => {
      const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      showSlide(newIndex);
    });

    // Indicators
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => showSlide(index));
    });

    // Auto-play (optional)
    let autoPlayInterval = setInterval(() => {
      const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
      showSlide(newIndex);
    }, 3000);

    slideshow.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    slideshow.addEventListener('mouseleave', () => {
      autoPlayInterval = setInterval(() => {
        const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
        showSlide(newIndex);
      }, 3000);
    });
  });
}

// Render featured products (first 3) on index.html
if (document.getElementById('featured-grid')) {
  renderProducts('featured-grid', products.slice(0, 3));
}

// Render all products on store.html
if (document.getElementById('product-grid')) {
  renderProducts('product-grid', products);
}

// Render new collection products
if (document.getElementById('new-collection-grid')) {
  renderProducts('new-collection-grid', products.slice(0, 6)); // Show first 6 for new collection
}
