const express = require("express")
const app = express()
const authRouter = require("./routes/authRoutes")
const cookie = require("cookie-parser")
const postRoutes = require("./routes/postRoutes")


app.use(express.json())
app.use("/api/auth", authRouter)
app.use(cookie())
app.use("/api/posts", postRoutes)


module.exports = app
