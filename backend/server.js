const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://place-mate-ai-vert.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Parse JSON
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "PlaceMate AI API is running." });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/placements", require("./routes/placementRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

// Error Handler
app.use((error, req, res, next) => {
  return res.status(400).json({
    message: error.message || "Request failed.",
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});