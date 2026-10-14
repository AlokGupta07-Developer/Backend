const express = require("express")
const postRoutes = express.Router()
const postsController = require("../controllers/postsControllers")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})
const identifyUser = require("../middlewares/authMiddlewares")

//Create posts API: method: POST, name: /api/posts/ 
postRoutes.post("/", identifyUser, upload.single("image"), postsController.createPostsController )

//get all posts that are created by logged in user, API: method: GET, name: /api/posts/
postRoutes.get("/", identifyUser, postsController.getPostController)

postRoutes.get("/details/:postId", identifyUser, postsController.getPostDetailsController)

//get all the posts created in the DB, API: method: GET, name: /api/posts/feed
postRoutes.get("/feed", identifyUser, postsController.getFeedController)

module.exports = postRoutes