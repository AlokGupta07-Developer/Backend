const express = require("express")
const followRouter = express.Router()
const folloControllers = require("../controllers/followControllers")
const identifyUser = require("../middlewares/authMiddlewares")

followRouter.post("/follow/:userName",identifyUser,folloControllers.followController)
followRouter.post("/unfollow/:userName", identifyUser, folloControllers.unFollowController)

module.exports = followRouter