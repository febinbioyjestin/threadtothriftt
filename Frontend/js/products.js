// ADDED: Product page add-to-cart logic
const STORAGE_KEY = "threadtothriftt_cart"; // ADDED

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}; // ADDED

const saveCart = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}; // ADDED

// FIXED rendering issue
// UPDATED product naming
document.addEventListener("DOMContentLoaded", () => {
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    const nameEl = card.querySelector(".product-name");
    if (nameEl) {
      nameEl.textContent = card.dataset.name || "";
    }
  });

  const grid = document.querySelector(".product-grid");
  if (!grid) {
    return;
  }

  grid.addEventListener("click", (event) => {
    const button = event.target.closest(".add-to-cart");
    if (!button) {
      return;
    }

    const card = button.closest(".product-card");
    if (!card) {
      return;
    }

    const item = {
      id: card.dataset.id,
      name: card.dataset.name,
      price: Number(card.dataset.price) || 0,
      quantity: 1,
      image: card.dataset.image,
    }; // ADDED

    const cart = loadCart();
    const existing = cart.find((entry) => entry.id === item.id);

    if (existing) {
      existing.quantity += 1; // UPDATED
    } else {
      cart.push(item); // ADDED
    }

    saveCart(cart); // UPDATED
    alert("Item added to cart"); // ADDED
  });
});
