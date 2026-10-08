const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")   //Used to store file on memory storage
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")


//API method:POST name: /api/posts/, Protected api: Only those user access which have a valid token otherwise 401(unautherized access)
postRouter.post("/",upload.single("image"),identifyUser,postController.createPostController)

postRouter.get("/",identifyUser,postController.getPostController)

postRouter.get("/details/:postId",identifyUser,postController.getPostDetailsControllers)

postRouter.post("/like/:postId", identifyUser, postController.likePostController)

postRouter.post("/like/:postId", identifyUser, postController.UnlikePostController)
module.exports = postRouter
