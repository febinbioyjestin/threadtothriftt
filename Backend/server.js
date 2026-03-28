const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// Load env from repo root so `node server.js` works from Backend folder.
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const frontendDir = path.join(__dirname, "..", "Frontend");
app.use(express.static(frontendDir));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(frontendDir, "index.html"));
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
