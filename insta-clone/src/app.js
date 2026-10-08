const express = require("express")
const app = express()
const authRouter = require("./routes/auth.routes")
const postRouter = require("./routes/post.routes")
const cookieParser = require("cookie-parser")



app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)

module.exports = app