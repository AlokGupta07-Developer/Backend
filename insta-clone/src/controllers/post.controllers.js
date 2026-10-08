const postModel = require("../model/post.model");
const imageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const ImageKit = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await ImageKit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "text",
    folder: "insta-clone",
  });

  const token = req.cookies.Token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided, Unautherized access",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);

  const post = await postModel.create({
    imageURL: file.url,
    caption: req.body.caption,
    userId: decoded.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  //Checks which user create post
  const token = req.cookies.Token;

  //User neither register or nor login then
  if (!token) {
    return res.status(401).json({
      message: "Token not provided, Unauthorized access",
    });
  }

  //Kya ye token genuine hai aur JWT_SECRET ke according valid hai?
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "User not authorized",
    });
  }

  const userid = decoded.id;

  const posts = await postModel.find({
    userId: userid,
  });

  res.status(200).json({
    message: "Post fetched successfully",
    posts,
  });
}

async function getDetailsPostController(req,res) {

  const token = req.cookies.Token;

  //User neither register or nor login then
  if (!token) {
    return res.status(401).json({
      message: "Token not provided, Unauthorized access",
    });
  }

  //Kya ye token genuine hai aur JWT_SECRET ke according valid hai?
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "User not authorized",
    });
  }

  const userid = decoded.id;
  const postId = req.params.id

  

}
module.exports = {
  createPostController,
  getPostController,
  getDetailsPostController
};
