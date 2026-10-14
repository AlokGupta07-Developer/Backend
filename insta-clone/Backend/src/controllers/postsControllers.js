const postsModel = require("../model/postsModel");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../model/likesModel");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostsController(req, res) {
  try {
    const { caption } = req.body;

    // 4. Upload image to ImageKit
    const file = await imageKit.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname),
      fileName: req.file.originalname,
      folder: "/insta-posts",
    });

    // 5. Save post in MongoDB
    const posts = await postsModel.create({
      imgURL: file.url,
      caption,
      userId: req.user.id,
    });

    return res.status(201).json({
      message: "Post created successfully",
      posts,
    });
  } catch (error) {
    console.error("Create posts error:", error);

    return res.status(500).json({
      message: "Failed to create post",
    });
  }
}

async function getPostController(req, res) {
  try {
    const posts = await postsModel.find({
      userId: req.user.id,
    });

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.error("Get posts error:", error);

    return res.status(500).json({
      message: "Failed to fetch posts",
    });
  }
}

async function getPostDetailsController(req, res) {
  const postId = req.params.postId;
  const userId = req.user.id;
  try {
    const post = await postsModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const isValidUser = post.userId.toString() === userId.toString();

    if (!isValidUser) {
      return res.status(403).json({
        message: "Forbidden content",
      });
    }

    return res.status(200).json({
      message: "Post details fetched successfully",
      post,
    });
  } catch (error) {
    console.error("Get post details error:", error);

    return res.status(500).json({
      message: "Failed to fetch post details",
    });
  }
}


async function getFeedController(req, res) {
  try {
    const user = req.user.userName;

    const posts = await Promise.all(
      (
        await postsModel
          .find()
          .populate("userId")
          .sort({ createdAt: -1 })
          .lean()
      ).map(async (post) => {
        const isLiked = await likeModel.findOne({
          user: user,
          post: post._id,
        });

        post.isLiked = Boolean(isLiked);

        return post;
      }),
    );

    return res.status(200).json({
      message: "Feed fetched successfully",
      posts,
    });
  } catch (error) {
    console.error("Get feed error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}


module.exports = {
  createPostsController,
  getPostController,
  getPostDetailsController,
  getFeedController,
};
