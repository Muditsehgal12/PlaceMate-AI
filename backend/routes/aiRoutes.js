const express = require("express");
const {
  analyzeResume,
  getMockQuestions,
} = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/resume-analyzer", protect, upload.single("resume"), analyzeResume);
router.get("/mock-questions", protect, getMockQuestions);

module.exports = router;
