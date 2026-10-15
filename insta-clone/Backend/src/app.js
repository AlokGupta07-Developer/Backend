const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const followRouter = require("./routes/followRoutes");
const likeRouter = require("./routes/likeRoutes");

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRoutes);
app.use("/api/posts", likeRouter);
app.use("/api", followRouter);

module.exports = app;
