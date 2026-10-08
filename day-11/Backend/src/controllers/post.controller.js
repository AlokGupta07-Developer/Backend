const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../model/postsModel");
const likeModel = require("../model/likesModel");

//Import imagekit private key
const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

//Create posts controller
async function createPostController(req, res) {
  //Upload file on cloud storage provider
  const file = await imageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "insta-clone-img-post",
  });

  //To create post and save into DB
  const post = await postModel.create({
    caption: req.body.caption,
    imgURL: file.url,
    user: req.user.id,
  });

  //Send response
  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

//Get all posts that are created by a user
async function getPostController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}

//Return an details about specific post with the id
async function getPostDetailsControllers(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  //created post check valid user or not
  const isValidUser = post.user.toString() === userId.toString();

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden content",
    });
  }

  return res.status(200).json({
    message: "Posts details Fetched Successfully",
    post,
  });
}

async function likePostController(req, res) {
  const userName = req.user.userName;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const likePost = await likeModel.create({
    post: postId,
    user: userName,
  });

  return res.status(201).json({
    message: "Post liked Successfully",
    likePost,
  });
}


async function UnlikePostController(req, res) {
  const userName = req.user.userName;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

    // Find user's like on this post
  const like = await likeModel.findOne({
    post: postId,
    user: userName,
  });

  // If user has not liked the post
  if (!like) {
    return res.status(400).json({
      message: "You have not liked this post",
    });
  }

  // Delete the like
  await likeModel.findByIdAndDelete(like._id);

  return res.status(200).json({
    message: "Post unliked successfully",
  });
}







module.exports = {
  createPostController,
  getPostController,
  getPostDetailsControllers,
  likePostController,
  UnlikePostController
}
