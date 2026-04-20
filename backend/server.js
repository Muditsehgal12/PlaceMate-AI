const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Temporary open CORS fix
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "PlaceMate AI API is running." });
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/placements", require("./routes/placementRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

app.use((error, req, res, next) => {
  res.status(400).json({
    message: error.message || "Request failed.",
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});