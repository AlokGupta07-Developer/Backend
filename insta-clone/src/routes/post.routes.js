const express = require("express")
const postController = require("../controllers/post.controllers")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})

const postRouter = express.Router()

// API method: POST name: /api/post
postRouter.post("/", upload.single("image"), postController.createPostController )
postRouter.get("/", postController.getPostController)
postRouter.get("/details/:postId", postController.getDetailsPostController)


module.exports = postRouter

