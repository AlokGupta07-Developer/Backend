const express = require("express")
const identifyUser = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller")

const userRouter = express.Router()


userRouter.post("/follow/:userName",identifyUser,userController.followUserController)
userRouter.post("/unfollow/:userName", identifyUser, userController.unfollowUserController)

module.exports = userRouter 