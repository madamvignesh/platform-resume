const express = require("express");
const Resume = require("../models/resume");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * Create a new resume
 */
router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;

    const resume = new Resume({
      owner: req.user.id, // ✅ matches schema
      versions: [
        {
          title: title || "Untitled Resume",
          personal: {},
          education: [],
          experience: [],
          skills: [],
        },
      ],
    });

    await resume.save();
    res.status(201).json(resume);
  } catch (err) {
    console.error("❌ Error creating resume:", err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Get all resumes for logged-in user
 */
router.get("/", auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ owner: req.user.id }); // ✅ use owner
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Get a single resume by ID
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Update a resume
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id }, // ✅ use owner
      req.body,
      { new: true }
    );
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Delete a resume
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id, // ✅ use owner
    });
    if (!resume) return res.status(404).json({ message: "Resume not found" });
    res.json({ message: "Resume deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
