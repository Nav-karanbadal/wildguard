const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const joinTeamRoutes = require("./routes/joinTeamRoutes")
const contactRoutes = require("./routes/contactRoutes")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Join Team API
app.use("/api/join", joinTeamRoutes)

// Contact API
app.use("/api/contact", contactRoutes)

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "WildGuard backend is running!",
  })
})

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!")

    const PORT = process.env.PORT || 5000

    app.listen(PORT, () => {
      console.log(`WildGuard backend running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message)
  })