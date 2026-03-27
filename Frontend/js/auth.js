const API_BASE = "http://localhost:5000";

const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");

const setMessage = (el, text, ok = false) => {
  if (!el) return;
  el.textContent = text;
  el.classList.toggle("success", ok);
};

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("register-name")?.value?.trim();
    const email = document.getElementById("register-email")?.value?.trim();
    const password = document.getElementById("register-password")?.value;

    if (!name || !email || !password) {
      setMessage(registerMessage, "Please fill in name, email, and password.");
      return;
    }

    setMessage(registerMessage, "Creating your account...");

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(registerMessage, data.message || "Registration failed.");
        return;
      }

      registerForm.reset();
      setMessage(registerMessage, "Registered successfully. You can log in now.", true);
    } catch (error) {
      setMessage(registerMessage, "Could not reach the server. Is it running?");
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email")?.value?.trim();
    const password = document.getElementById("login-password")?.value;

    if (!email || !password) {
      setMessage(loginMessage, "Please enter email and password.");
      return;
    }

    setMessage(loginMessage, "Signing you in...");

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(loginMessage, data.message || "Login failed.");
        return;
      }

      loginForm.reset();
      setMessage(loginMessage, `Welcome back, ${data.user?.name || "user"}!`, true);
    } catch (error) {
      setMessage(loginMessage, "Could not reach the server. Is it running?");
    }
  });
}
