
const postsModel = require("../model/postsModel");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostsController(req, res) {
  try {
    const { caption } = req.body;

    // 1. Check image first
    if (!req.file) {
      return res.status(400).json({
        message: "Image is required",
      });
    }

    // 2. Check token
    const token = req.cookies?.Token;

    if (!token) {
      return res.status(401).json({
        message: "Token not provided. Please login.",
      });
    }

    // 3. Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    // 4. Upload image to ImageKit
    const file = await imageKit.files.upload({
      file: await toFile(
        req.file.buffer,
        req.file.originalname
      ),
      fileName: req.file.originalname,
      folder: "/insta-posts",
    });

    // 5. Save post in MongoDB
    const posts = await postsModel.create({
      imgURL: file.url,
      caption,
      userId: decoded.id,
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

module.exports = {
  createPostsController,
};
