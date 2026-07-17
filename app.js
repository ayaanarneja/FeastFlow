/* ============================================================
   app.js
   Shared utilities used across every page: theming, favorites,
   card rendering, and the order-history queue.
   ============================================================ */

const FAV_KEY = "fd_favorites_v1";
const THEME_KEY = "fd_theme_v1";
const ORDERS_KEY = "fd_orders_v1"; // Queue -> FIFO order history

/* ---------- Helpers: find by id (Array.find -> O(n)) ---------- */
function findRestaurantById(id) {
  return RESTAURANTS.find(r => r.id === Number(id));
}
function findFoodById(id) {
  return FOOD_ITEMS.find(f => f.id === Number(id));
}
function getFoodByRestaurant(restaurantId) {
  return FOOD_ITEMS.filter(f => f.restaurantId === Number(restaurantId));
}

/* ---------- Favorites / Wishlist (Array used as a Set) ---------- */
function getFavorites() {
  return JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
}
function isFavorite(id) {
  return getFavorites().includes(Number(id));
}
function toggleFavorite(id) {
  id = Number(id);
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
  } else {
    favs.push(id);
    showToast("Added to favorites ❤️");
  }
  localStorage.setItem(FAV_KEY, JSON.stringify(favs));
}

/* ---------- Dark Mode ---------- */
function applyTheme() {
  const theme = localStorage.getItem(THEME_KEY) || "light";
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelectorAll(".theme-toggle").forEach(btn => {
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
  });
}
function toggleTheme() {
  const current = localStorage.getItem(THEME_KEY) || "light";
  localStorage.setItem(THEME_KEY, current === "dark" ? "light" : "dark");
  applyTheme();
}

/* ---------- Order History (Queue: FIFO, enqueue on checkout) ---------- */
function enqueueOrder(order) {
  const queue = JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
  queue.push(order); // enqueue at the back
  localStorage.setItem(ORDERS_KEY, JSON.stringify(queue));
}
function getOrderQueue() {
  return JSON.parse(localStorage.getItem(ORDERS_KEY) || "[]");
}

/* ---------- Render: Category pills ---------- */
function renderCategories(containerId, linkToRestaurants = true) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = CATEGORIES.map(cat => `
    <a class="category-card" href="${linkToRestaurants ? `restaurants.html?category=${encodeURIComponent(cat.name)}` : "#"}">
      <span class="emoji">${cat.emoji}</span>
      <span class="name">${cat.name}</span>
    </a>
  `).join("");
}

/* ---------- Render: Restaurant Card ---------- */
function restaurantCardHTML(r) {
  const fav = isFavorite(r.id);
  return `
    <div class="restaurant-card" data-id="${r.id}">
      <div class="card-media">
        ${r.emoji}
        <button class="fav-btn ${fav ? "active" : ""}" aria-label="Toggle favorite" onclick="event.preventDefault(); toggleFavorite(${r.id}); this.classList.toggle('active');">
          ${fav ? "❤️" : "🤍"}
        </button>
        <span class="price-tag">${r.price}</span>
      </div>
      <div class="card-body">
        <h3>${r.name}</h3>
        <p class="card-tagline">${r.tagline}</p>
        <div class="card-meta">
          <span class="rating">⭐ ${r.rating}</span>
          <span>⏱ ${r.deliveryTime}</span>
          <span>🍽 ${r.category}</span>
        </div>
        <div class="card-footer">
          <a class="btn btn-primary btn-block" href="menu.html?id=${r.id}">View Menu</a>
        </div>
      </div>
    </div>
  `;
}

function renderRestaurantGrid(containerId, restaurants) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (restaurants.length === 0) {
    el.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="emoji">🍽️</div>
        <h3>No restaurants found</h3>
        <p>Try a different search term or filter.</p>
      </div>`;
    return;
  }
  el.innerHTML = restaurants.map(restaurantCardHTML).join("");
}

/* ---------- Render: Food Item Card ---------- */
function foodCardHTML(item) {
  const cart = getCart();
  const inCartQty = cart[item.id] ? cart[item.id].quantity : 0;
  return `
    <div class="food-card" data-id="${item.id}">
      <div class="food-media">
        <span class="veg-badge ${item.veg ? "" : "nonveg"}"></span>
        ${item.emoji}
      </div>
      <h4>${item.name}</h4>
      <p class="desc">${item.description}</p>
      <div class="food-meta">
        <span class="price">₹${item.price}</span>
        <span class="rating">⭐ ${item.rating}</span>
      </div>
      <div class="cart-cta" id="cta-${item.id}">
        ${inCartQty > 0 ? qtyStepperHTML(item.id, inCartQty) : `<button class="add-cart-btn btn-block" onclick="handleAddToCart(${item.id})">Add to Cart</button>`}
      </div>
    </div>
  `;
}

function qtyStepperHTML(id, qty) {
  return `
    <div class="qty-stepper" style="width:100%; justify-content:space-between;">
      <button aria-label="Decrease quantity" onclick="handleDecreaseQty(${id})">−</button>
      <span>${qty}</span>
      <button aria-label="Increase quantity" onclick="handleIncreaseQty(${id})">+</button>
    </div>
  `;
}

function handleAddToCart(id) {
  const item = findFoodById(id);
  addToCart(item);
  refreshFoodCardCTA(id);
}
function handleIncreaseQty(id) {
  increaseQty(id);
  refreshFoodCardCTA(id);
}
function handleDecreaseQty(id) {
  decreaseQty(id);
  refreshFoodCardCTA(id);
}
function refreshFoodCardCTA(id) {
  const cta = document.getElementById(`cta-${id}`);
  if (!cta) return;
  const cart = getCart();
  const qty = cart[id] ? cart[id].quantity : 0;
  cta.innerHTML = qty > 0 ? qtyStepperHTML(id, qty) : `<button class="add-cart-btn btn-block" onclick="handleAddToCart(${id})">Add to Cart</button>`;
}

function renderFoodGrid(containerId, items) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (items.length === 0) {
    el.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="emoji">🍔</div>
        <h3>No items in this category</h3>
        <p>Check back soon or browse another category.</p>
      </div>`;
    return;
  }
  el.innerHTML = items.map(foodCardHTML).join("");
}

/* ---------- Loading Skeletons ---------- */
function renderSkeletons(containerId, count = 6) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = Array.from({ length: count }).map(() =>
    `<div class="skeleton-card"><div class="skeleton-shimmer"></div></div>`
  ).join("");
}

/* ---------- Init shared UI on every page ---------- */
function initSharedUI() {
  applyTheme();
  updateCartBadge();

  document.querySelectorAll(".theme-toggle").forEach(btn => {
    btn.addEventListener("click", toggleTheme);
  });

  document.getElementById("cartOpenBtn")?.addEventListener("click", openCartDrawer);
  document.getElementById("cartCloseBtn")?.addEventListener("click", closeCartDrawer);
  document.getElementById("cartOverlay")?.addEventListener("click", closeCartDrawer);

  document.getElementById("navToggle")?.addEventListener("click", () => {
    document.querySelector(".nav-links")?.classList.toggle("open");
  });
}

document.addEventListener("DOMContentLoaded", initSharedUI);
