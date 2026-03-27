// ADDED: Cart rendering and removal logic
const STORAGE_KEY = "threadtothriftt_cart"; // ADDED
const CREDIT_AMOUNT = 10; // ADDED

const formatPrice = (value) => `?${value}`; // ADDED

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

const calculateSubtotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0); // ADDED

const renderCart = () => {
  const tbody = document.querySelector("#cart-items");
  const subtotalEl = document.querySelector("#subtotal-value");
  const totalEl = document.querySelector("#total-value");
  const creditEl = document.querySelector("#credit-value");

  if (!tbody || !subtotalEl || !totalEl || !creditEl) {
    return;
  }

  const items = loadCart();
  tbody.innerHTML = "";

  if (items.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML =
      '<td colspan="4" style="color: var(--muted); padding: 16px 10px;">Your cart is empty.</td>';
    tbody.appendChild(row);
  } else {
    items.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>${formatPrice(item.price)}</td>
        <td>
          <button class="cta primary remove-item" type="button" data-id="${item.id}" style="padding: 6px 12px; font-size: 0.85rem;">Remove</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  const subtotal = calculateSubtotal(items);
  const total = Math.max(subtotal - CREDIT_AMOUNT, 0);

  subtotalEl.textContent = formatPrice(subtotal); // UPDATED
  creditEl.textContent = `-${formatPrice(CREDIT_AMOUNT)}`; // UPDATED
  totalEl.textContent = formatPrice(total); // UPDATED
};

// ADDED: Event delegation for remove buttons
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("#cart-items");
  if (!tbody) {
    return;
  }

  tbody.addEventListener("click", (event) => {
    const button = event.target.closest(".remove-item");
    if (!button) {
      return;
    }

    const id = button.dataset.id;
    const items = loadCart().filter((item) => item.id !== id); // UPDATED
    saveCart(items); // UPDATED
    renderCart(); // UPDATED
  });

  renderCart(); // UPDATED
});
