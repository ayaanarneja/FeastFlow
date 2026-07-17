/* ============================================================
   search.js
   Handles the hero search (index.html) and the sticky navbar
   search (all pages). Both redirect to restaurants.html with a
   ?search= query param, where filter.js performs the live O(n)
   search against the restaurants array.
   ============================================================ */

function goToSearch(term) {
  const q = term.trim();
  window.location.href = `restaurants.html${q ? `?search=${encodeURIComponent(q)}` : ""}`;
}

function initHeroSearch() {
  const form = document.getElementById("heroSearchForm");
  const input = document.getElementById("heroSearchInput");
  if (!form || !input) return;
  form.addEventListener("submit", e => {
    e.preventDefault();
    goToSearch(input.value);
  });
}

function initNavSearch() {
  const input = document.getElementById("navSearchInput");
  if (!input) return;

  // On restaurants.html the nav search should filter live instead of navigating.
  const onRestaurantsPage = window.location.pathname.endsWith("restaurants.html");

  const params = new URLSearchParams(window.location.search);
  if (params.get("search")) input.value = params.get("search");

  if (onRestaurantsPage && typeof handleSearchInput === "function") {
    input.addEventListener("input", () => handleSearchInput(input.value));
  } else {
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        goToSearch(input.value);
      }
    });
  }
}

/* Simple search-suggestions dropdown for the hero search (bonus feature) */
function initSearchSuggestions() {
  const input = document.getElementById("heroSearchInput");
  const box = document.getElementById("searchSuggestions");
  if (!input || !box) return;

  input.addEventListener("input", () => {
    const term = input.value.trim().toLowerCase();
    if (term.length < 2) { box.innerHTML = ""; box.style.display = "none"; return; }

    const matches = RESTAURANTS.filter(r => r.name.toLowerCase().includes(term)).slice(0, 5);
    if (matches.length === 0) { box.innerHTML = ""; box.style.display = "none"; return; }

    box.style.display = "block";
    box.innerHTML = matches.map(r => `
      <a href="menu.html?id=${r.id}" style="display:flex;align-items:center;gap:10px;padding:10px 14px;color:var(--color-text);">
        <span>${r.emoji}</span><span>${r.name}</span>
      </a>
    `).join("");
  });

  document.addEventListener("click", e => {
    if (!box.contains(e.target) && e.target !== input) box.style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeroSearch();
  initNavSearch();
  initSearchSuggestions();
});
