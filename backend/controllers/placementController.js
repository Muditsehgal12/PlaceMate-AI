const Placement = require("../models/Placement");

const getPlacements = async (req, res) => {
  try {
    const filter = { student: req.user.id };
    if (req.query.status && req.query.status !== "All") {
      filter.status = req.query.status;
    }

    const placements = await Placement.find(filter).sort({
      createdAt: -1,
    });
    return res.json(placements);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createPlacement = async (req, res) => {
  try {
    const { company, role, status } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: "Company and role are required." });
    }

    const placement = await Placement.create({
      student: req.user.id,
      company,
      role,
      status: status || "Applied",
    });

    return res.status(201).json(placement);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatePlacement = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, role, status } = req.body;

    const placement = await Placement.findOneAndUpdate(
      { _id: id, student: req.user.id },
      { company, role, status },
      { new: true, runValidators: true }
    );

    if (!placement) {
      return res.status(404).json({ message: "Placement not found." });
    }

    return res.json(placement);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletePlacement = async (req, res) => {
  try {
    const { id } = req.params;
    const placement = await Placement.findOneAndDelete({
      _id: id,
      student: req.user.id,
    });

    if (!placement) {
      return res.status(404).json({ message: "Placement not found." });
    }

    return res.json({ message: "Placement deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPlacementStats = async (req, res) => {
  try {
    const placements = await Placement.find({ student: req.user.id });
    const stats = {
      totalApplications: placements.length,
      interviewsScheduled: placements.filter((item) => item.status === "Interview")
        .length,
      offersReceived: placements.filter((item) => item.status === "Selected").length,
    };
    return res.json(stats);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPlacements,
  createPlacement,
  updatePlacement,
  deletePlacement,
  getPlacementStats,
};
