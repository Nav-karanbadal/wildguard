const express = require("express")
const Contact = require("../models/Contact")

const router = express.Router()

// Submit Contact form
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body)

    const savedContact = await contact.save()

    res.status(201).json({
      message: "Contact message submitted successfully!",
      contact: savedContact,
    })
  } catch (error) {
    console.error("Contact submission failed:", error.message)

    res.status(500).json({
      message: "Failed to submit contact message.",
    })
  }
})

module.exports = router