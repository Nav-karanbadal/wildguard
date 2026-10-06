const express = require("express")
const JoinTeam = require("../models/JoinTeam")

const router = express.Router()

// Submit Join Team application
router.post("/", async (req, res) => {
  try {
    const application = new JoinTeam(req.body)

    const savedApplication = await application.save()

    res.status(201).json({
      message: "Join Team application submitted successfully!",
      application: savedApplication,
    })
  } catch (error) {
    console.error("Join Team submission failed:", error.message)

    res.status(500).json({
      message: "Failed to submit Join Team application.",
    })
  }
})

module.exports = router