const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

const baseUrl = process.env.E2E_BASE_URL || "http://localhost:8080";

const buildDriver = () => {
  const options = new chrome.Options()
    .addArguments("--headless=new")
    .addArguments("--no-sandbox")
    .addArguments("--disable-dev-shm-usage")
    .addArguments("--window-size=1280,900");

  return new Builder().forBrowser("chrome").setChromeOptions(options).build();
};

const waitForUrlContains = async (driver, fragment, timeout = 15000) => {
  await driver.wait(until.urlContains(fragment), timeout);
};

const run = async () => {
  const driver = buildDriver();

  try {
    await driver.get(`${baseUrl}/index.html`);
    await waitForUrlContains(driver, "index.html");

    const productsLink = await driver.findElement(
      By.css('a[href="products.html"]')
    );
    await productsLink.click();
    await waitForUrlContains(driver, "products.html");

    const addToCartButton = await driver.findElement(
      By.css(".add-to-cart")
    );
    await addToCartButton.click();

    try {
      const alert = await driver.wait(until.alertIsPresent(), 5000);
      await alert.accept();
    } catch (error) {
      // Some browsers may block alerts; proceed if none appear.
    }

    const cartLink = await driver.findElement(By.css('a[href="cart.html"]'));
    await cartLink.click();
    await waitForUrlContains(driver, "cart.html");

    const checkoutLink = await driver.findElement(
      By.css('a[href="checkout.html"]')
    );
    await checkoutLink.click();
    await waitForUrlContains(driver, "checkout.html");

    await driver.wait(
      until.elementLocated(By.css("h1")),
      10000
    );
  } finally {
    await driver.quit();
  }
};

run().catch((error) => {
  console.error("Selenium test failed:", error);
  process.exit(1);
});
