const express = require("express");
const app = express();
const cookie = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const postRuter = require("./routes/post.routes");
const userRouter = require("./routes/user.routes")
const cors = require("cors")

//Middlewares
app.use(express.json()); //Without this req.body give undefined
app.use(cookie()); //Cookie save in cookie storage
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use("/api/auth", authRouter); //Add prefix/string (/api/auth)
app.use("/api/posts", postRuter); //Add prefix/string (/api/posts)
app.use("/api/users", userRouter); //Add prefix/string (/api/users)

module.exports = app;
