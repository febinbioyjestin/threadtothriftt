const fs = require("fs");
const path = require("path");

describe("Frontend DOM", () => {
  test("Index page loads core elements", () => {
    const htmlPath = path.join(__dirname, "..", "index.html");
    const html = fs.readFileSync(htmlPath, "utf8");

    document.documentElement.innerHTML = html;

    const title = document.querySelector("title");
    const heroTitle = document.querySelector(".hero-title");
    const productsLink = document.querySelector('a[href="products.html"]');

    expect(title).not.toBeNull();
    expect(title.textContent.toLowerCase()).toContain("threadtothriftt");
    expect(heroTitle).not.toBeNull();
    expect(productsLink).not.toBeNull();
  });
});
