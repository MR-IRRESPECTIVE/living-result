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
    category: "common",
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
    category: "unique",
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
    category: "common",
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
    category: "unique",
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

// ===== STATE FOR PRODUCT CATEGORY =====
let currentCategory = "unique";

function switchProductCategory(category) {
  currentCategory = category;

  // Update tabs
  document.getElementById("tab-unique").classList.remove("active");
  document.getElementById("tab-common").classList.remove("active");
  document.getElementById("tab-unique").style.borderBottomColor = "transparent";
  document.getElementById("tab-unique").style.color = "var(--text-muted)";
  document.getElementById("tab-common").style.borderBottomColor = "transparent";
  document.getElementById("tab-common").style.color = "var(--text-muted)";

  const activeTab = document.getElementById(`tab-${category}`);
  activeTab.classList.add("active");
  activeTab.style.borderBottomColor = "var(--accent)";
  activeTab.style.color = "var(--text-primary)";

  // Update descriptions
  document.getElementById("category-description-unique").style.display = category === "unique" ? "block" : "none";
  document.getElementById("category-description-common").style.display = category === "common" ? "block" : "none";

  renderProducts();
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
  const filteredProducts = products.filter(p => p.category === currentCategory);

  // Scroll view (default)
  const scrollContainer = document.getElementById("productsScroll");
  if (scrollContainer) {
    scrollContainer.innerHTML = filteredProducts.map(renderProductCard).join("");
  }

  // Grid view (View All)
  const gridContainer = document.getElementById("productsGrid");
  if (gridContainer) {
    gridContainer.innerHTML = filteredProducts.map(renderProductCard).join("");
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

// ===== PRIVACY POLICY MODAL =====
function openPrivacyModal(e) {
  if (e) e.preventDefault();
  const modalOverlay = document.getElementById("privacyModalOverlay");
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closePrivacyModal(e) {
  if (e && e.target.id !== "privacyModalOverlay" && !e.target.closest('.modal-close')) return;
  const modalOverlay = document.getElementById("privacyModalOverlay");
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

        <div style="margin: 30px 0; display: flex; flex-direction: column; gap: 10px;">
          ${flavor.inStock
      ? `<button onclick="openCheckoutModal(${product.id}, ${currentSelectedFlavorIndex})" class="btn-primary" style="width: 100%; justify-content: center; padding: 18px; font-size: 16px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                Secure Checkout
              </button>
              <a href="${whatsappLink}" target="_blank" rel="noopener" style="width: 100%; text-align: center; color: var(--text-muted); font-size: 13px; text-decoration: underline; margin-top: 5px;">
                Or order via WhatsApp
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

// ===== PROTOTYPE CHECKOUT LOGIC =====
let pendingOrderAmount = 0;

function openCheckoutModal(productId, flavorIndex) {
  // Close product modal
  const productModal = document.getElementById("productModalOverlay");
  if (productModal) productModal.classList.remove("active");

  const product = products.find(p => p.id === productId);
  const flavor = product.flavors[flavorIndex];
  pendingOrderAmount = product.price;

  // Render summary
  const summaryEl = document.getElementById("checkoutSummary");
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
        <span style="color: var(--text-primary); font-weight: bold;">${product.name}</span>
        <span style="color: var(--accent); font-weight: bold;">₹${product.price.toLocaleString()}</span>
      </div>
      <div style="font-size: 13px; color: var(--text-muted);">Flavor: ${flavor.name}</div>
      <div style="font-size: 13px; color: var(--text-muted);">Quantity: 1</div>
      <hr style="border: 0; border-top: 1px solid var(--border); margin: 15px 0;">
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--text-primary); font-weight: bold;">Total to Pay:</span>
        <span style="color: #fff; font-weight: bold; font-size: 18px;">₹${product.price.toLocaleString()}</span>
      </div>
    `;
  }

  const overlay = document.getElementById("checkoutModalOverlay");
  if (overlay) {
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeCheckoutModal(e) {
  if (e && e.target.id !== "checkoutModalOverlay" && !e.target.closest('.modal-close')) return;
  const overlay = document.getElementById("checkoutModalOverlay");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function processCheckout(e) {
  e.preventDefault();
  // Close checkout modal
  const checkoutOverlay = document.getElementById("checkoutModalOverlay");
  if (checkoutOverlay) checkoutOverlay.classList.remove("active");
  
  // Update and show mock payment gateway
  const mockAmount = document.getElementById("mockPaymentAmount");
  if (mockAmount) mockAmount.innerText = "₹" + pendingOrderAmount.toLocaleString();
  
  const paymentOverlay = document.getElementById("mockPaymentOverlay");
  if (paymentOverlay) {
    paymentOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function simulatePaymentSuccess() {
  // Close payment modal
  const paymentOverlay = document.getElementById("mockPaymentOverlay");
  if (paymentOverlay) paymentOverlay.classList.remove("active");
  
  // Show success modal
  const successOverlay = document.getElementById("successModalOverlay");
  if (successOverlay) successOverlay.classList.add("active");
  
  // Clear cart/form in a real scenario
  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) checkoutForm.reset();
}

function simulatePaymentFailure() {
  const paymentOverlay = document.getElementById("mockPaymentOverlay");
  if (paymentOverlay) paymentOverlay.classList.remove("active");
  document.body.style.overflow = "";
  alert("Payment cancelled. You can try again.");
}

function closeSuccessModal(e) {
  if (e && e.target.id !== "successModalOverlay" && !e.target.closest('button')) return;
  const successOverlay = document.getElementById("successModalOverlay");
  if (successOverlay) {
    successOverlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupAnimations();
});
