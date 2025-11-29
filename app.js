// ========================================
// Navratri's Grace - JavaScript
// ========================================

// Product Data
const products = [
    {
        id: 1,
        name: "Rani Pink Bandhani Chaniya Choli",
        price: 4999,
        category: "navratri",
        workType: "bandhani",
        color: "pink",
        image: "pink-choli.png",
        images: ["pink-choli.png", "product-detail.png", "pink-choli.png", "product-detail.png"],
        description: "Rani Pink Bandhani Chaniya Choli is a underized Bandhani chaniya Choli. It/vidoes o skirtsetty chosr for dilmiation and inweider. Thread embrosie ao mimoven's comfort and pink thread rock and wirror and roldent; and descriptive vizion to comfort with winny bandharis.",
        sku: "CC-001",
        tags: "Navratri, Bandhani, Mirror Work",
        rating: 5,
        badge: "New"
    },
    {
        id: 2,
        name: "Royal Blue Mirror Work Chaniya Choli",
        price: 5499,
        category: "wedding",
        workType: "mirror",
        color: "blue",
        image: "product-detail.png",
        images: ["product-detail.png", "pink-choli.png", "product-detail.png", "pink-choli.png"],
        description: "Exquisite royal blue Chaniya Choli featuring intricate mirror work and traditional Gujarati embroidery. Perfect for wedding celebrations and special occasions.",
        sku: "CC-002",
        tags: "Wedding, Mirror Work, Royal",
        rating: 5,
        badge: "Popular"
    },
    {
        id: 3,
        name: "Vibrant Red Navratri Special",
        price: 4499,
        category: "navratri",
        workType: "mirror",
        color: "red",
        image: "pink-choli.png",
        images: ["pink-choli.png", "product-detail.png", "pink-choli.png", "product-detail.png"],
        description: "Stunning red Chaniya Choli with elaborate mirror work and golden embroidery. A must-have for Navratri festivities.",
        sku: "CC-003",
        tags: "Navratri, Festival, Mirror Work",
        rating: 5
    },
    {
        id: 4,
        name: "Yellow Bandhani Traditional",
        price: 3999,
        category: "navratri",
        workType: "bandhani",
        color: "yellow",
        image: "product-detail.png",
        images: ["product-detail.png", "pink-choli.png", "product-detail.png", "pink-choli.png"],
        description: "Bright yellow Chaniya Choli with vibrant Bandhani tie-dye work and colorful embellishments. Traditional yet contemporary design.",
        sku: "CC-004",
        tags: "Bandhani, Traditional, Colorful",
        rating: 4
    },
    {
        id: 5,
        name: "Purple Embroidered Elegance",
        price: 6499,
        category: "wedding",
        workType: "bandhani",
        color: "purple",
        image: "pink-choli.png",
        images: ["pink-choli.png", "product-detail.png", "pink-choli.png", "product-detail.png"],
        description: "Elegant purple Chaniya Choli with intricate thread embroidery and mirror work. Premium quality fabric with exquisite detailing.",
        sku: "CC-005",
        tags: "Wedding, Premium, Embroidered",
        rating: 5,
        badge: "Premium"
    },
    {
        id: 6,
        name: "Green Traditional Navratri",
        price: 4299,
        category: "navratri",
        workType: "mirror",
        color: "green",
        image: "product-detail.png",
        images: ["product-detail.png", "pink-choli.png", "product-detail.png", "pink-choli.png"],
        description: "Gorgeous green Chaniya Choli with traditional mirror work and colorful thread embroidery. Perfect for festive celebrations.",
        sku: "CC-006",
        tags: "Navratri, Traditional, Festive",
        rating: 5
    },
    {
        id: 7,
        name: "Pink Wedding Collection",
        price: 7999,
        category: "wedding",
        workType: "bandhani",
        color: "pink",
        image: "pink-choli.png",
        images: ["pink-choli.png", "product-detail.png", "pink-choli.png", "product-detail.png"],
        description: "Premium pink Chaniya Choli from our exclusive wedding collection. Features intricate handwork and finest quality materials.",
        sku: "CC-007",
        tags: "Wedding, Premium, Handcrafted",
        rating: 5,
        badge: "Exclusive"
    },
    {
        id: 8,
        name: "Blue Bandhani Delight",
        price: 3799,
        category: "navratri",
        workType: "bandhani",
        color: "blue",
        image: "product-detail.png",
        images: ["product-detail.png", "pink-choli.png", "product-detail.png", "pink-choli.png"],
        description: "Beautiful blue Chaniya Choli with Bandhani work and mirror embellishments. Comfortable and stylish for all-day wear.",
        sku: "CC-008",
        tags: "Bandhani, Comfortable, Festive",
        rating: 4
    }
];

// State
let cart = [];
let currentFilter = 'all';
let colorFilter = null;
let priceFilter = 10000;
let selectedProduct = null;

// ========================================
// Initialization
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);

    // Load cart from localStorage
    loadCart();

    // Render products
    renderProducts();

    // Initialize event listeners
    initEventListeners();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize AOS (Animate On Scroll)
    initAOS();
});

// ========================================
// Event Listeners
// ========================================

function initEventListeners() {
    // Header scroll effect
    window.addEventListener('scroll', handleScroll);

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Search modal
    document.getElementById('searchBtn')?.addEventListener('click', () => {
        openModal('searchModal');
        document.getElementById('searchInput')?.focus();
    });

    document.getElementById('searchModalClose')?.addEventListener('click', () => {
        closeModal('searchModal');
    });

    document.getElementById('searchInput')?.addEventListener('input', (e) => {
        handleSearch(e.target.value);
    });

    // Cart panel
    document.getElementById('cartBtn')?.addEventListener('click', openCart);
    document.getElementById('cartClose')?.addEventListener('click', closeCart);

    // Product modal
    document.getElementById('productModalClose')?.addEventListener('click', () => {
        closeModal('productModal');
    });

    // Size chart modal
    document.getElementById('sizeChartBtn')?.addEventListener('click', () => {
        openModal('sizeChartModal');
    });

    document.getElementById('sizeChartClose')?.addEventListener('click', () => {
        closeModal('sizeChartModal');
    });

    // Size chart tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Shop now button
    document.getElementById('shopNowBtn')?.addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderProducts();
        });
    });

    // Advanced filter toggle
    document.getElementById('advancedFilterToggle')?.addEventListener('click', () => {
        document.getElementById('advancedFilters')?.classList.toggle('active');
    });

    // Color filters
    document.querySelectorAll('.color-filter').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.color-filter').forEach(b => b.classList.remove('active'));

            if (colorFilter === e.target.dataset.color) {
                colorFilter = null;
            } else {
                e.target.classList.add('active');
                colorFilter = e.target.dataset.color;
            }
            renderProducts();
        });
    });

    // Price range
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    priceRange?.addEventListener('input', (e) => {
        priceFilter = parseInt(e.target.value);
        priceValue.textContent = `₹${priceFilter.toLocaleString('en-IN')}`;
        renderProducts();
    });

    // Back to top
    document.getElementById('backToTop')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Modal overlays
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal.id);
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Close mobile menu
                const nav = document.getElementById('nav');
                const menuToggle = document.getElementById('menuToggle');
                nav?.classList.remove('active');
                menuToggle?.classList.remove('active');
            }
        });
    });

    // Newsletter form
    document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Thank you for subscribing!');
        e.target.reset();
    });

    // Add to cart from modal
    document.getElementById('addToCartBtn')?.addEventListener('click', () => {
        if (selectedProduct) {
            addToCart(selectedProduct);
        }
    });

    // Size selection
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

// ========================================
// Scroll Handling
// ========================================

function handleScroll() {
    const header = document.getElementById('header');
    const backToTop = document.getElementById('backToTop');

    // Header scroll effect
    if (window.scrollY > 50) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }

    // Back to top button
    if (window.scrollY > 300) {
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
    }

    // Update active nav link
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========================================
// Scroll Animations
// ========================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
}

function initAOS() {
    // Simple AOS implementation
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((el, index) => {
        const delay = el.dataset.aosDelay || 0;
        el.style.transitionDelay = `${delay}ms`;
    });
}

// ========================================
// Product Rendering
// ========================================

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;

    // Filter products
    const filtered = products.filter(product => {
        const matchesCategory = currentFilter === 'all' || product.category === currentFilter || product.workType === currentFilter;
        const matchesColor = !colorFilter || product.color === colorFilter;
        const matchesPrice = product.price <= priceFilter;

        return matchesCategory && matchesColor && matchesPrice;
    });

    // Render products
    productsGrid.innerHTML = filtered.map((product, index) => `
        <div class="product-card" style="animation-delay: ${index * 0.1}s">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-actions">
                    <button class="product-action-btn" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})" title="Add to Cart">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M7.5 18.3333C8.42047 18.3333 9.16667 17.5871 9.16667 16.6667C9.16667 15.7462 8.42047 15 7.5 15C6.57953 15 5.83333 15.7462 5.83333 16.6667C5.83333 17.5871 6.57953 18.3333 7.5 18.3333Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M16.6667 18.3333C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667C18.3333 15.7462 17.5871 15 16.6667 15C15.7462 15 15 15.7462 15 16.6667C15 17.5871 15.7462 18.3333 16.6667 18.3333Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M1.66667 1.66667H4.16667L6.4 13.3917C6.47636 13.7753 6.68484 14.12 6.98953 14.3652C7.29422 14.6105 7.67561 14.7408 8.06667 14.7333H16.1667C16.5577 14.7408 16.9391 14.6105 17.2438 14.3652C17.5485 14.12 17.757 13.7753 17.8333 13.3917L19.1667 5.83333H5" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                    <button class="product-action-btn" onclick="openProductModal(${product.id})" title="Quick View">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M1.66667 10C1.66667 10 4.16667 4.16667 10 4.16667C15.8333 4.16667 18.3333 10 18.3333 10C18.3333 10 15.8333 15.8333 10 15.8333C4.16667 15.8333 1.66667 10 1.66667 10Z" stroke="currentColor" stroke-width="2"/>
                            <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="product-details">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">₹${product.price.toLocaleString('en-IN')}</p>
                <div class="product-rating">
                    <div class="stars">${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}</div>
                </div>
            </div>
        </div>
    `).join('');

    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-20); color: var(--color-gray-500);">
                <p style="font-size: var(--font-size-xl);">No products found matching your filters.</p>
            </div>
        `;
    }
}

// ========================================
// Product Modal
// ========================================

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    selectedProduct = product;

    // Update modal content
    document.getElementById('modalMainImage').src = product.images[0];
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = `₹${product.price.toLocaleString('en-IN')}`;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductSku').textContent = product.sku;
    document.getElementById('modalProductCategory').textContent = product.category.charAt(0).toUpperCase() + product.category.slice(1);
    document.getElementById('modalProductTags').textContent = product.tags;

    // Update thumbnails
    const thumbnailImages = document.getElementById('thumbnailImages');
    thumbnailImages.innerHTML = product.images.map((img, index) => `
        <img src="${img}" alt="${product.name}" 
             class="${index === 0 ? 'active' : ''}"
             onclick="changeMainImage('${img}', this)">
    `).join('');

    openModal('productModal');
}

function changeMainImage(src, element) {
    document.getElementById('modalMainImage').src = src;
    document.querySelectorAll('.thumbnail-images img').forEach(img => {
        img.classList.remove('active');
    });
    element.classList.add('active');
}

// ========================================
// Cart Management
// ========================================

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;

    // Update items
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <svg width="80" height="80" viewBox="0 0 20 20" fill="none" style="margin: 0 auto var(--space-4); opacity: 0.3;">
                        <path d="M7.5 18.3333C8.42047 18.3333 9.16667 17.5871 9.16667 16.6667C9.16667 15.7462 8.42047 15 7.5 15C6.57953 15 5.83333 15.7462 5.83333 16.6667C5.83333 17.5871 6.57953 18.3333 7.5 18.3333Z" stroke="currentColor" stroke-width="2"/>
                        <path d="M16.6667 18.3333C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667C18.3333 15.7462 17.5871 15 16.6667 15C15.7462 15 15 15.7462 15 16.6667C15 17.5871 15.7462 18.3333 16.6667 18.3333Z" stroke="currentColor" stroke-width="2"/>
                        <path d="M1.66667 1.66667H4.16667L6.4 13.3917C6.47636 13.7753 6.68484 14.12 6.98953 14.3652C7.29422 14.6105 7.67561 14.7408 8.06667 14.7333H16.1667C16.5577 14.7408 16.9391 14.6105 17.2438 14.3652C17.5485 14.12 17.757 13.7753 17.8333 13.3917L19.1667 5.83333H5" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                        <div class="cart-item-quantity">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">&times;</button>
                </div>
            `).join('');
        }
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
}

function openCart() {
    document.getElementById('cartPanel')?.classList.add('active');
}

function closeCart() {
    document.getElementById('cartPanel')?.classList.remove('active');
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartUI();
    }
}

// ========================================
// Search
// ========================================

function handleSearch(query) {
    const searchResults = document.getElementById('searchResults');
    if (!query.trim()) {
        searchResults.innerHTML = '';
        return;
    }

    const results = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.tags.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
        searchResults.innerHTML = '<p style="padding: var(--space-4); color: var(--color-gray-500);">No results found</p>';
    } else {
        searchResults.innerHTML = results.map(product => `
            <div style="display: flex; gap: var(--space-4); padding: var(--space-4); border-bottom: 1px solid var(--color-gray-200); cursor: pointer; transition: background var(--transition-base);"
                 onclick="openProductModal(${product.id}); closeModal('searchModal');"
                 onmouseover="this.style.background='var(--color-gray-50)'"
                 onmouseout="this.style.background='transparent'">
                <img src="${product.image}" alt="${product.name}" style="width: 60px; height: 75px; object-fit: cover; border-radius: var(--radius-md);">
                <div>
                    <div style="font-weight: 600; margin-bottom: var(--space-1);">${product.name}</div>
                    <div style="color: var(--color-primary); font-weight: 700;">₹${product.price.toLocaleString('en-IN')}</div>
                </div>
            </div>
        `).join('');
    }
}

// ========================================
// Modal Management
// ========================================

function openModal(modalId) {
    document.getElementById(modalId)?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// Toast Notifications
// ========================================

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    if (toast && toastMessage) {
        toastMessage.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// ========================================
// Utility Functions
// ========================================

// Prevent default on modal overlays
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        const modal = e.target.closest('.modal');
        if (modal) {
            closeModal(modal.id);
        }
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close all modals
        document.querySelectorAll('.modal.active').forEach(modal => {
            closeModal(modal.id);
        });

        // Close cart
        closeCart();
    }
});

// Expose functions globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.openProductModal = openProductModal;
window.changeMainImage = changeMainImage;
