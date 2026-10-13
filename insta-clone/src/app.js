const express = require("express")
const app = express()
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes")

const postRoutes = require("./routes/postRoutes")
const followRouter = require("./routes/followRoutes")
const likeRouter = require("./routes/likeRoutes")

app.use(express.json())
app.use("/api/auth", authRouter)
app.use(cookieParser())

app.use("/api/posts", postRoutes)
app.use("/api", followRouter)
app.use("/api/posts", likeRouter)


module.exports = app
