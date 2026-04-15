const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "PlaceMate AI API is running." });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/placements", require("./routes/placementRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

app.use((error, req, res, next) => {
  return res.status(400).json({
    message: error.message || "Request failed.",
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});