const express = require("express");
const {
  getPlacements,
  createPlacement,
  updatePlacement,
  deletePlacement,
  getPlacementStats,
} = require("../controllers/placementController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getPlacements);
router.get("/stats", protect, getPlacementStats);
router.post("/", protect, createPlacement);
router.put("/:id", protect, updatePlacement);
router.delete("/:id", protect, deletePlacement);

module.exports = router;
