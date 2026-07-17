/* ============================================================
   filter.js
   Powers restaurants.html: search + category filter + sort.
   All operations run on the RESTAURANTS array using
   .filter() / .sort() -> O(n) and O(n log n) respectively.
   ============================================================ */

const listState = {
  search: "",
  category: "All",
  sort: "default"
};

function getFilteredRestaurants() {
  let list = RESTAURANTS.slice(); // shallow copy so .sort() doesn't mutate source

  // ---- Search (Array.filter -> O(n)) ----
  if (listState.search.trim()) {
    const term = listState.search.trim().toLowerCase();
    list = list.filter(r =>
      r.name.toLowerCase().includes(term) || r.category.toLowerCase().includes(term)
    );
  }

  // ---- Category filter (Array.filter -> O(n)) ----
  if (listState.category !== "All") {
    list = list.filter(r => r.category === listState.category);
  }

  // ---- Sort (Array.sort -> O(n log n)) ----
  if (listState.sort === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  } else if (listState.sort === "deliveryTime") {
    list.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
  }

  return list;
}

function refreshRestaurantList() {
  const results = getFilteredRestaurants();
  renderRestaurantGrid("restaurantsGrid", results);
  const countEl = document.getElementById("resultsCount");
  if (countEl) countEl.textContent = `${results.length} restaurant${results.length !== 1 ? "s" : ""} found`;
}

function handleSearchInput(value) {
  listState.search = value;
  refreshRestaurantList();
}

function renderCategoryChips() {
  const el = document.getElementById("categoryChips");
  if (!el) return;
  const cats = ["All", ...CATEGORIES.map(c => c.name)];
  el.innerHTML = cats.map(cat => `
    <button class="filter-chip ${listState.category === cat ? "active" : ""}" data-cat="${cat}">${cat}</button>
  `).join("");

  el.querySelectorAll(".filter-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      listState.category = btn.dataset.cat;
      el.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      refreshRestaurantList();
    });
  });
}

function initSortSelect() {
  const select = document.getElementById("sortSelect");
  if (!select) return;
  select.addEventListener("change", () => {
    listState.sort = select.value;
    refreshRestaurantList();
  });
}

function initRestaurantsPage() {
  const grid = document.getElementById("restaurantsGrid");
  if (!grid) return;

  // Read URL params set by the hero/nav search or category card links.
  const params = new URLSearchParams(window.location.search);
  if (params.get("search")) listState.search = params.get("search");
  if (params.get("category")) listState.category = params.get("category");

  const searchInput = document.getElementById("navSearchInput");
  if (searchInput && listState.search) searchInput.value = listState.search;

  renderSkeletons("restaurantsGrid", 8);
  renderCategoryChips();
  initSortSelect();

  // Simulate a brief network delay so the skeleton loader is visible (bonus feature).
  setTimeout(refreshRestaurantList, 350);
}

document.addEventListener("DOMContentLoaded", initRestaurantsPage);
