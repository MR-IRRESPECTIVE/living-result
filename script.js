// =====================================================
// PRODUCT DATA — Easy to add/remove/edit products here!
// =====================================================
// To add a new product: copy one object, change the values.
// To remove: just delete the object from the array.
// bestSeller: true/false — shows "Best Seller" badge
// inStock: true/false — shows stock status
const products = [
  {
    id: 1,
    name: "Hulk Mass Gainer",
    price: 3499,
    oldPrice: 4299,
    discount: 18,
    rating: 5,
    reviews: 214,
    bestSeller: true,
    stockLeft: 12,
    description: "Hulk Mass Gainer is designed for extreme muscle growth and quick recovery. Packed with high-quality calories to help you pack on size fast. *DISCLAIMER :Best results with calorie surplus, resistance training and proper routine. Individual weight gain results may vary.",
    ingredients: "Maltodextrin, Whey Protein Concentrate, Cocoa Powder, Artificial Flavors, Sucralose.",
    nutritionalFacts: [
      "Calories: 1200 kcal",
      "Protein: 50g",
      "Carbohydrates: 250g",
      "Fat: 5g"
    ],
    flavors: [
      { name: "Chocolate", image: "images/hulk-mass-gainer.png", inStock: true },
      { name: "Vanilla", image: "images/creatine.png", inStock: false }
    ]
  },
  {
    id: 2,
    name: "Hydra Mass Gainer",
    price: 3299,
    oldPrice: 3999,
    discount: 17,
    rating: 4,
    reviews: 156,
    bestSeller: false,
    stockLeft: 8,
    description: "Hydra Mass Gainer provides a balanced ratio of proteins and complex carbs to fuel your hardest workouts and drive muscle synthesis. *DISCLAIMER :Best results with calorie surplus, resistance training and proper routine. Individual weight gain results may vary.",
    ingredients: "Oat Flour, Whey Protein Isolate, Natural Flavors, Stevia.",
    nutritionalFacts: [
      "Calories: 1000 kcal",
      "Protein: 45g",
      "Carbohydrates: 200g",
      "Fat: 4g"
    ],
    flavors: [
      { name: "Cookies & Cream", image: "images/hydra-mass-gainer.png", inStock: true }
    ]
  },
  {
    id: 3,
    name: "Hydra Whey Protein",
    price: 2499,
    oldPrice: 3199,
    discount: 21,
    rating: 5,
    reviews: 342,
    bestSeller: true,
    stockLeft: 24,
    description: "Premium fast-absorbing whey protein to ignite muscle protein synthesis immediately after your workouts. *DISCLAIMER :Contains dairy ingredients. Not suitable for individuals with lactose sensitivity unless tolerated",
    ingredients: "Whey Protein Isolate, Whey Protein Concentrate, Digestive Enzymes.",
    nutritionalFacts: [
      "SERVING SIZE: 1 scoop (33g)",
      "Energy: 119 kcal",
      "Protein: 26g",
      "Carbohydrates: 3.9g",
      "Fat: 1.1g",
      "Sugar: 1g"
    ],
    flavors: [
      { name: "Double Chocolate", image: "images/hydra-whey-protein.png", inStock: true },
      { name: "Strawberry", image: "images/hydra-whey-protein.png", inStock: true }
    ]
  },
  {
    id: 4,
    name: "ISO Plasma Zero Protein",
    price: 1799,
    oldPrice: 4000,
    discount: 55,
    rating: 5,
    reviews: 89,
    bestSeller: true,
    stockLeft: 5,
    description: "The purest form of protein. Zero carbs, zero fat, 100% pure isolate for serious athletes demanding the best. *DISCLAIMER :Contains dairy ingredients. Not suitable for individuals with lactose sensitivity unless tolerated",
    ingredients: "Hydrolyzed Whey Protein Isolate, Natural and Artificial Flavors.",
    nutritionalFacts: [
      "Calories: 110 kcal",
      "Protein: 27g",
      "Carbohydrates: 0g",
      "Fat: 0g"
    ],
    flavors: [
      { name: "Milk Chocolate", image: "images/iso-plasma-zero-protein.png", inStock: true }
    ]
  }
];

// ===== RENDER A SINGLE PRODUCT CARD (reusable) =====
function renderProductCard(product) {
  const stars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);

  // Use the first flavor as default display
  const defaultFlavor = product.flavors[0];

  return `
    <div class="product-card" id="product-${product.id}" onclick="openProductModal(${product.id})" style="cursor: pointer;">
      <div class="product-image">
        <img src="${defaultFlavor.image}" alt="${product.name}" loading="lazy">
        <span class="stock-badge ${defaultFlavor.inStock ? 'in-stock' : 'out-of-stock'}">
          ${defaultFlavor.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
        ${product.bestSeller ? '<span class="best-seller-badge">🔥 Best Seller</span>' : ''}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-flavor">${product.flavors.length} Flavor${product.flavors.length > 1 ? 's' : ''}</p>
        <div class="product-pricing">
          <span class="current-price">₹${product.price.toLocaleString()}</span>
          <span class="old-price">₹${product.oldPrice.toLocaleString()}</span>
          <span class="discount">${product.discount}% OFF</span>
        </div>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="scarcity-text" style="color: var(--accent); font-size: 12px; font-weight: 600; margin-top: 8px;">
           🔥 Hurry, only ${product.stockLeft} left!
        </div>
      </div>
    </div>
  `;
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
  // Scroll view (default)
  const scrollContainer = document.getElementById("productsScroll");
  if (scrollContainer) {
    scrollContainer.innerHTML = products.map(renderProductCard).join("");
  }

  // Grid view (View All)
  const gridContainer = document.getElementById("productsGrid");
  if (gridContainer) {
    gridContainer.innerHTML = products.map(renderProductCard).join("");
  }
}

// ===== SCROLL PRODUCTS (LEFT/RIGHT ARROWS) =====
function scrollProducts(direction) {
  const container = document.getElementById("productsScroll");
  const scrollAmount = 320;
  container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

// ===== VIEW ALL PRODUCTS TOGGLE =====
let viewAllExpanded = false;
function toggleViewAll() {
  const scrollWrapper = document.getElementById("productsScrollWrapper");
  const gridContainer = document.getElementById("productsGrid");
  const btn = document.getElementById("viewAllBtn");

  viewAllExpanded = !viewAllExpanded;

  if (viewAllExpanded) {
    scrollWrapper.classList.add("hidden");
    gridContainer.classList.remove("hidden");
    btn.textContent = "Show Less";
  } else {
    scrollWrapper.classList.remove("hidden");
    gridContainer.classList.add("hidden");
    btn.textContent = "View All Products";
  }
}

// ===== PRODUCT MODAL LOGIC =====
let currentModalProductId = null;
let currentSelectedFlavorIndex = 0;

function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentModalProductId = productId;
  currentSelectedFlavorIndex = 0; // default to first flavor

  renderModalContent(product);

  const modalOverlay = document.getElementById("productModalOverlay");
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProductModal(e) {
  // Only close if clicking the overlay or close button
  if (e && e.target.id !== "productModalOverlay" && !e.target.closest('.modal-close')) return;

  const modalOverlay = document.getElementById("productModalOverlay");
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

function selectFlavor(index) {
  currentSelectedFlavorIndex = index;
  const product = products.find(p => p.id === currentModalProductId);
  renderModalContent(product);
}

function switchModalTab(tabId) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.modal-tab-content').forEach(c => c.classList.remove('active'));

  document.querySelector(`[onclick="switchModalTab('${tabId}')"]`).classList.add('active');
  document.getElementById(`tab-${tabId}`).classList.add('active');
}

function renderModalContent(product) {
  const modalContentEl = document.getElementById("productModalContent");
  const flavor = product.flavors[currentSelectedFlavorIndex];

  const whatsappMsg = encodeURIComponent(
    `Hi Living Result, I want to order:\nProduct: ${product.name}\nFlavor: ${flavor.name}\nQuantity: 1`
  );
  const whatsappLink = `https://wa.me/917003714398?text=${whatsappMsg}`;

  const flavorPills = product.flavors.map((f, i) => `
    <button class="flavor-pill ${i === currentSelectedFlavorIndex ? 'active' : ''}" onclick="selectFlavor(${i})">
      ${f.name}
    </button>
  `).join("");

  const nutritionList = product.nutritionalFacts.map(fact => `<li>${fact}</li>`).join("");

  modalContentEl.innerHTML = `
    <button class="modal-close" onclick="closeProductModal({target: this})">&times;</button>
    <div class="modal-grid">
      <!-- Left: Image -->
      <div class="modal-image-col">
        <img src="${flavor.image}" alt="${product.name}">
        <span class="stock-badge ${flavor.inStock ? 'in-stock' : 'out-of-stock'}">
          ${flavor.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      
      <!-- Right: Info -->
      <div class="modal-info-col">
        <h2>${product.name}</h2>
        <div class="modal-price">
          ₹${product.price.toLocaleString()} <span style="font-size: 14px; text-decoration: line-through; color: var(--text-muted); font-weight: normal; margin-left: 10px;">₹${product.oldPrice.toLocaleString()}</span>
        </div>
        
        <div class="flavor-selector">
          <span class="flavor-label">Select Flavor:</span>
          <div class="flavor-pills">
            ${flavorPills}
          </div>
        </div>

        <div style="margin: 30px 0;">
          ${flavor.inStock
      ? `<a href="${whatsappLink}" target="_blank" rel="noopener" class="btn-primary" style="width: 100%; justify-content: center; padding: 18px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.49l4.625-1.472A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-2.168 0-4.19-.587-5.932-1.61l-.425-.253-2.742.874.87-2.675-.277-.44A9.77 9.77 0 012.182 12c0-5.423 4.395-9.818 9.818-9.818S21.818 6.577 21.818 12s-4.395 9.818-9.818 9.818z"/></svg>
                Order on WhatsApp
              </a>`
      : `<button class="btn-primary" style="width: 100%; justify-content: center; padding: 18px; background: var(--border); color: var(--text-muted); cursor: not-allowed;">Out of Stock</button>`
    }
        </div>

        <!-- TABS -->
        <div class="modal-tabs">
          <div class="modal-tab active" onclick="switchModalTab('desc')">About</div>
          <div class="modal-tab" onclick="switchModalTab('nutrition')">Nutritional Facts</div>
          <div class="modal-tab" onclick="switchModalTab('ingredients')">Ingredients</div>
        </div>

        <div class="modal-tab-content active" id="tab-desc">
          <p>${product.description}</p>
        </div>
        
        <div class="modal-tab-content" id="tab-nutrition">
          <ul>${nutritionList}</ul>
        </div>
        
        <div class="modal-tab-content" id="tab-ingredients">
          <p>${product.ingredients}</p>
        </div>
        
      </div>
    </div>
  `;
}

// ===== SEARCH OVERLAY =====
function toggleSearch() {
  const overlay = document.getElementById("searchOverlay");
  const input = document.getElementById("searchInput");
  overlay.classList.toggle("active");
  if (overlay.classList.contains("active")) {
    document.body.style.overflow = "hidden";
    setTimeout(() => input.focus(), 200);
  } else {
    document.body.style.overflow = "";
    input.value = "";
    document.getElementById("searchResults").innerHTML = "";
  }
}

function handleSearch(query) {
  const resultsEl = document.getElementById("searchResults");
  if (!query.trim()) {
    resultsEl.innerHTML = "";
    return;
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.flavor.toLowerCase().includes(query.toLowerCase())
  );

  if (filtered.length === 0) {
    resultsEl.innerHTML = '<div class="search-no-results">No products found. Try a different search.</div>';
    return;
  }

  resultsEl.innerHTML = filtered.map(p => `
    <a href="#product-${p.id}" class="search-result-item" onclick="toggleSearch(); setTimeout(() => document.getElementById('product-${p.id}').scrollIntoView({behavior:'smooth'}), 300);">
      <img src="${p.image}" alt="${p.name}">
      <div>
        <div class="search-result-name">${p.name}</div>
        <div class="search-result-price">₹${p.price.toLocaleString()} · ${p.flavor}</div>
      </div>
    </a>
  `).join("");
}

// Close search on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const searchOverlay = document.getElementById("searchOverlay");
    if (searchOverlay.classList.contains("active")) toggleSearch();
    const cartSidebar = document.getElementById("cartSidebar");
    if (cartSidebar.classList.contains("active")) toggleCart();
  }
});

// ===== ACCOUNT DROPDOWN =====
function toggleAccount() {
  const dropdown = document.getElementById("accountDropdown");
  dropdown.classList.toggle("active");
}

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  const accountBtn = document.getElementById("accountBtn");
  const dropdown = document.getElementById("accountDropdown");
  if (dropdown && !accountBtn.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});

// ===== CART SIDEBAR =====
function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

// ===== MOBILE MENU =====
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");
const mobileOverlay = document.getElementById("mobileOverlay");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  mobileOverlay.classList.toggle("active");
});

mobileOverlay.addEventListener("click", () => {
  navMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");
});

// Close menu on nav link click
document.querySelectorAll(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    mobileOverlay.classList.remove("active");
  });
});

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const scrollY = window.scrollY;
  if (scrollY > 80) {
    navbar.style.background = "rgba(10,10,10,0.97)";
    navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.5)";
  } else {
    navbar.style.background = "rgba(10,10,10,0.92)";
    navbar.style.boxShadow = "none";
  }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

function setupAnimations() {
  const animateElements = document.querySelectorAll(
    ".product-card, .stat-item, .testimonial-card, .benefit-item, .why-content, .why-image"
  );
  animateElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const id = this.getAttribute("href");
    if (id === "#") return;
    e.preventDefault();
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupAnimations();
});
