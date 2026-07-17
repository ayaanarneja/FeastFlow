/* ============================================================
   cart.js
   Cart is stored as an OBJECT (hash map) keyed by food item id:
   { <id>: { id, name, price, emoji, quantity } }
   -> add/remove/update are all O(1) average time.
   Persisted to localStorage so it survives page reloads/navigation.
   ============================================================ */

const CART_KEY = "fd_cart_v1";
const RECENT_KEY = "fd_recent_v1"; // Stack of recently viewed restaurant ids

/* ---------- Core cart storage (Object / HashMap) ---------- */
function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

/* Add item (or bump quantity) -> O(1) */
function addToCart(foodItem, qty = 1) {
  const cart = getCart();
  if (cart[foodItem.id]) {
    cart[foodItem.id].quantity += qty;
  } else {
    cart[foodItem.id] = {
      id: foodItem.id,
      name: foodItem.name,
      price: foodItem.price,
      emoji: foodItem.emoji,
      restaurantId: foodItem.restaurantId,
      quantity: qty
    };
  }
  saveCart(cart);
  showToast(`${foodItem.name} added to cart`);
}

/* Remove item entirely -> O(1) */
function removeFromCart(id) {
  const cart = getCart();
  const item = cart[id];
  delete cart[id];
  saveCart(cart);
  if (item) showToast(`${item.name} removed from cart`);
}

/* Increase / decrease quantity -> O(1) */
function increaseQty(id) {
  const cart = getCart();
  if (cart[id]) {
    cart[id].quantity += 1;
    saveCart(cart);
  }
}

function decreaseQty(id) {
  const cart = getCart();
  if (cart[id]) {
    cart[id].quantity -= 1;
    if (cart[id].quantity <= 0) {
      delete cart[id];
    }
    saveCart(cart);
  }
}

function clearCart() {
  saveCart({});
}

/* ---------- Derived values (Array ops: reduce) ---------- */
function getCartItemsArray() {
  return Object.values(getCart());
}

function getCartCount() {
  return getCartItemsArray().reduce((sum, item) => sum + item.quantity, 0);
}

function getCartSubtotal() {
  return getCartItemsArray().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

const DELIVERY_FEE = 40;
const TAX_RATE = 0.05;

function getCartTotals() {
  const subtotal = getCartSubtotal();
  const deliveryFee = subtotal > 0 ? DELIVERY_FEE : 0;
  const tax = Math.round(subtotal * TAX_RATE);
  const grandTotal = subtotal + deliveryFee + tax;
  return { subtotal, deliveryFee, tax, grandTotal };
}

/* ---------- Cart badge (navbar) ---------- */
function updateCartBadge() {
  document.querySelectorAll(".cart-count").forEach(el => {
    const count = getCartCount();
    el.textContent = count;
    el.style.display = count > 0 ? "flex" : "none";
  });
}

/* ---------- Cart Drawer (used across all pages) ---------- */
function renderCartDrawer() {
  const container = document.getElementById("cartItems");
  const footer = document.getElementById("cartDrawerFooter");
  if (!container) return;

  const items = getCartItemsArray();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <div class="emoji">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some delicious food to get started.</p>
      </div>`;
    if (footer) footer.innerHTML = "";
    return;
  }

  container.innerHTML = items.map(item => `
    <div class="cart-item">
      <div class="emoji">${item.emoji}</div>
      <div class="info">
        <h5>${item.name}</h5>
        <div class="unit-price">₹${item.price} x ${item.quantity}</div>
      </div>
      <div class="qty-stepper">
        <button aria-label="Decrease quantity" onclick="decreaseQty(${item.id}); renderCartDrawer();">−</button>
        <span>${item.quantity}</span>
        <button aria-label="Increase quantity" onclick="increaseQty(${item.id}); renderCartDrawer();">+</button>
      </div>
      <div class="line-total">₹${item.price * item.quantity}</div>
      <button class="remove-btn" aria-label="Remove item" onclick="removeFromCart(${item.id}); renderCartDrawer();">✕</button>
    </div>
  `).join("");

  const { subtotal, deliveryFee, tax, grandTotal } = getCartTotals();
  if (footer) {
    footer.innerHTML = `
      <div class="summary-row"><span>Subtotal</span><span>₹${subtotal}</span></div>
      <div class="summary-row"><span>Delivery Fee</span><span>₹${deliveryFee}</span></div>
      <div class="summary-row"><span>Taxes</span><span>₹${tax}</span></div>
      <div class="summary-row total"><span>Grand Total</span><span>₹${grandTotal}</span></div>
      <a href="cart.html" class="btn btn-primary btn-block" style="margin-top:14px;">View Cart & Checkout</a>
    `;
  }
}

/* ---------- Cart Drawer open/close ---------- */
function openCartDrawer() {
  document.getElementById("cartOverlay")?.classList.add("open");
  document.getElementById("cartDrawer")?.classList.add("open");
  renderCartDrawer();
}
function closeCartDrawer() {
  document.getElementById("cartOverlay")?.classList.remove("open");
  document.getElementById("cartDrawer")?.classList.remove("open");
}

/* ---------- Recently Viewed (Stack: push to front, cap size) ---------- */
function pushRecentlyViewed(restaurantId) {
  let stack = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  stack = stack.filter(id => id !== restaurantId); // dedupe
  stack.unshift(restaurantId); // push to top of stack
  stack = stack.slice(0, 8); // cap
  localStorage.setItem(RECENT_KEY, JSON.stringify(stack));
}

function getRecentlyViewed() {
  return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
}

/* ---------- Toast Notifications ---------- */
function showToast(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✅</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);
