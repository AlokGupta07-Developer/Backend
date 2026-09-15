const express = require("express")
const app = express()
const authRoutes = require("./routes/auth.routes")
const cookieparser = require("cookie-parser")


app.use(express.json())
app.use("/api/auth", authRoutes)
app.use(cookieparser())

module.exports = app
