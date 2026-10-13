const postModel = require("../model/postsModel");
const likeModel = require("../model/likesModel");

async function likePostController(req, res) {
  try {
    const postId = req.params.postId;
    const userName = req.user.userName;

    const isPostExist = await postModel.findById(postId);

    if (!isPostExist) {
      return res.status(404).json({
        message: "This post does not exist",
      });
    }

    const isAlreadyLiked = await likeModel.findOne({
      post: postId,
      user: userName,
    });

    if (isAlreadyLiked) {
      return res.status(409).json({
        message: "You already liked this post",
      });
    }

    const like = await likeModel.create({
      post: postId,
      user: userName,
    });

    return res.status(201).json({
      message: "You successfully liked this post",
      like,
    });
  } catch (error) {
    console.error("Like post error:", error);

    return res.status(500).json({
      message: "Failed to like post",
    });
  }
}

async function disLikePostController(req, res) {
  try {
    const postId = req.params.postId;
    const userName = req.user.userName;

    const isAlreadyLike = await likeModel.findOne({
      post: postId,
      user: userName,
    });

    if (!isAlreadyLike) {
      return res.status(404).json({
        message: "You have not liked this post",
      });
    }

    await likeModel.findByIdAndDelete(isAlreadyLike._id);

    return res.status(200).json({
      message: "You successfully unliked this post",
    });
  } catch (error) {
    console.error("Dislike error:", error);

    return res.status(500).json({
      message: "Failed to unlike post",
    });
  }
}


module.exports = {
  likePostController,
  disLikePostController,
};
