import './style.css'

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 99.99,
    rating: 5,
    image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 249.99,
    rating: 4,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 59.99,
    rating: 5,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    name: 'Portable Speaker',
    price: 79.99,
    rating: 4,
    image: 'https://images.pexels.com/photos/1279406/pexels-photo-1279406.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    name: 'Camera Lens',
    price: 399.99,
    rating: 5,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    name: 'Phone Case',
    price: 24.99,
    rating: 4,
    image: 'https://images.pexels.com/photos/3825462/pexels-photo-3825462.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

let cart = 0;

function renderProducts() {
  const container = document.getElementById('products-container');

  const productsHTML = products.map(product => {
    const stars = Array(5).fill(0).map((_, i) =>
      i < product.rating
        ? '<i class="bi bi-star-fill"></i>'
        : '<i class="bi bi-star"></i>'
    ).join('');

    return `
      <div class="col-md-4 col-sm-6 fade-in">
        <div class="product-card">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <div class="product-body">
            <h5 class="product-title">${product.name}</h5>
            <div class="product-rating">${stars}</div>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="btn btn-primary w-100 add-to-cart" data-id="${product.id}">
              <i class="bi bi-cart-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = productsHTML;
}

function updateCartCount() {
  const cartCountElement = document.getElementById('cart-count');
  cartCountElement.textContent = cart;

  cartCountElement.classList.add('animate');
  setTimeout(() => {
    cartCountElement.classList.remove('animate');
  }, 300);
}

function setupEventListeners() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart')) {
      const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
      const product = products.find(p => p.id === productId);

      if (product) {
        cart++;
        updateCartCount();

        const button = e.target.closest('.add-to-cart');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="bi bi-check2"></i> Added!';
        button.classList.add('btn-success');
        button.classList.remove('btn-primary');

        setTimeout(() => {
          button.innerHTML = originalText;
          button.classList.remove('btn-success');
          button.classList.add('btn-primary');
        }, 2000);
      }
    }
  });

  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const message = document.getElementById('form-message');

    if (emailInput.value) {
      message.textContent = 'Thank you for subscribing!';
      message.style.color = '#198754';
      emailInput.value = '';

      setTimeout(() => {
        message.textContent = '';
      }, 5000);
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

function init() {
  renderProducts();
  setupEventListeners();

  setTimeout(() => {
    setupScrollAnimations();
  }, 100);
}

document.addEventListener('DOMContentLoaded', init);
