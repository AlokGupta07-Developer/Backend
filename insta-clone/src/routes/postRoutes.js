const express = require("express")
const postRoutes = express.Router()
const postsController = require("../controllers/postsControllers")
const multer = require("multer")
const upload = multer({storage: multer.memoryStorage()})

//Create posts API: method: POST, name: /api/posts/ 
postRoutes.post("/", upload.single("image"), postsController.createPostsController )

module.exports = postRoutes