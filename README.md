# 🍽️ FeastFlow — Food Delivery Web App

A modern, fully responsive food delivery frontend built with **HTML5, CSS3, and vanilla JavaScript (ES6+)** — inspired by Swiggy, Zomato, and Uber Eats. No backend required: all data is static/dummy and the cart persists via `localStorage`.

## 📖 Project Overview

FeastFlow lets a user browse restaurants, search and filter by cuisine, view a restaurant's menu, add items to a cart, adjust quantities, and walk through a UI-only checkout flow — all with smooth animations and a clean, card-based design system.

## ✨ Features

- Responsive landing page with hero search, categories, promo banner, and featured restaurants
- Restaurant listing with **live search**, **category filters**, and **sort by rating / delivery time**
- Restaurant menu page with category tabs and veg/non-veg badges
- Shopping cart drawer (slide-in) **and** a full cart/checkout page
- Add / remove items, increase / decrease quantity, subtotal & grand total calculation
- Cart persisted in `localStorage` — survives refresh and navigation
- **Bonus features implemented:**
  - 🌗 Dark mode toggle
  - ❤️ Favorites / wishlist on restaurant cards
  - 🕓 Recently viewed restaurants (Stack)
  - 📦 Order history queue (FIFO) recorded on checkout
  - 🧾 Animated cart drawer
  - 🔔 Toast notifications
  - 💀 Loading skeletons on the restaurant list
  - 🔍 Search suggestions dropdown on the hero search
  - ✅ Order success page
  - 🖼️ Lazy, dependency-free "images" via styled emoji tiles (no external image requests)

## 🛠️ Technologies Used

- HTML5 (semantic markup)
- CSS3 (custom properties, Flexbox, Grid, animations, glassmorphism navbar)
- JavaScript ES6+ (modules-free, DOM APIs, `localStorage`)
- Google Fonts: Poppins (display) + Inter (body)

No frameworks, build tools, or backend are required — just open the HTML files in a browser.

## 📁 Folder Structure

```
FoodDeliveryApp/
│── index.html          # Landing page
│── restaurants.html    # Restaurant listing (search/filter/sort)
│── menu.html            # Restaurant menu page
│── cart.html            # Cart + checkout page
│
│── css/
│     style.css          # Design tokens + all component styles
│     responsive.css     # Media queries (mobile / tablet / desktop)
│
│── js/
│     data.js            # Dummy restaurants, categories & food items
│     app.js             # Shared UI: favorites, theme, cards, order queue
│     cart.js            # Cart state (hash map), localStorage, drawer
│     search.js          # Hero + navbar search, suggestions
│     filter.js          # Restaurant list search/filter/sort logic
│
│── images/               # (Emoji-based visuals are used instead of binary
│                           assets, so this folder is reserved for any real
│                           photography you want to swap in later.)
│
│── README.md
```

## 🚀 Installation Steps

1. Download or clone this folder.
2. No build step or dependencies — it's static HTML/CSS/JS.
3. Open `index.html` directly in a browser, **or** serve it locally for the best experience:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8080
   ```
4. Visit `http://localhost:8080` (or the port your server prints).

## 🧱 Data Structures Used

### 1. Array
Used for restaurants, food items, and cart line items (as `Object.values(cart)`).
- `.filter()` — search & category filtering
- `.find()` — look up a restaurant/food item by id
- `.sort()` — sort by rating or delivery time
- `.reduce()` — compute cart subtotal and item count
- `.map()` — render lists of cards to HTML

### 2. Object (Hash Map)
The cart itself is a plain object keyed by food item id:
```javascript
cart = {
  101: { id: 101, name: "Burger", quantity: 2, price: 180 }
}
```
This gives O(1) average-case add/remove/update instead of scanning an array.

### 3. Stack (bonus)
"Recently viewed" restaurants are stored as a stack in `localStorage` — each visit is pushed to the front (`unshift`) and capped at 8 entries.

### 4. Queue (bonus)
Placed orders are enqueued (`push`) into an order-history list in `localStorage`, preserving FIFO order for a future "My Orders" view.

## ⏱️ Time Complexity Analysis

| Operation                     | Structure | Complexity |
|--------------------------------|-----------|------------|
| Search restaurants by name      | Array     | O(n)       |
| Filter by category              | Array     | O(n)       |
| Sort by rating / delivery time  | Array     | O(n log n) |
| Find restaurant/food by id      | Array     | O(n)       |
| Add item to cart                | Object    | O(1) avg   |
| Remove item from cart           | Object    | O(1) avg   |
| Update item quantity            | Object    | O(1) avg   |
| Compute cart subtotal/count     | Array     | O(n)       |

## 📸 Screenshots

_Add screenshots of the landing page, restaurant listing, menu page, and cart here once you've run the app locally._

## 🔮 Future Enhancements

- Real backend + database (Node/Express + MongoDB or similar) with authentication
- Live order tracking with a map view
- Real payment gateway integration
- Restaurant owner dashboard for menu management
- Ratings & reviews with photo uploads
- Push notifications for order status updates

---

Built as a frontend demo project — clean, modular, and ready to extend with a real backend.
