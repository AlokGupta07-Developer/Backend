const express = require("express")
const likeRoutes = express.Router()
const identifyUser = require("../middlewares/authMiddlewares")
const controllers = require("../controllers/likeControllers")

likeRoutes.post("/like/:postId", identifyUser, controllers.likePostController)
likeRoutes.post("/disLike/:postId", identifyUser, controllers.disLikePostController)

module.exports = likeRoutes