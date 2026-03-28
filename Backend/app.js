const path = require("path");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

// Load env from repo root so `node server.js` works from Backend folder.
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const app = express();

app.use(cors());
app.use(express.json());

const frontendDir = path.join(__dirname, "..", "Frontend");
app.use(express.static(frontendDir));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

module.exports = app;
