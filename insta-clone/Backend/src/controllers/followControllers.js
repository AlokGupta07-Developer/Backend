const followModel = require("../model/followModel");
const userModel = require("../model/usersModel");

async function followController(req, res) {
  const followerUserName = req.user.userName;
  const followeeUserName = req.params.userName;

  const isFolloweeExist = await userModel.findOne({
    userName: followeeUserName,
  });

  if (!isFolloweeExist) {
    return res.status(403).json({
      message: `You are trying to followe ${followeeUserName} is not exist`,
    });
  }

  if (followerUserName == followeeUserName) {
    return res.status(409).json({
      message: "You cannot follow yourself",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    followee: followeeUserName,
    follower: followerUserName,
  });

  if (isAlreadyFollowing) {
    return res.status(409).json({
      message: `You already follow ${followeeUserName} this user`,
    });
  }

  const followRecord = await followModel.create({
    followee: followeeUserName,
    follower: followerUserName,
  });

  res.status(201).json({
    message: `You are now following ${followeeUserName}`,
    followRecord,
  });
}

async function unFollowController(req, res) {
  try {
    const followeeUsername = req.params.userName;
    const followerUserName = req.user.userName;

    const isUserFollowing = await followModel.findOne({
      followee: followeeUsername,
      follower: followerUserName,
    });

    if (!isUserFollowing) {
      return res.status(404).json({
        message: `You are not following ${followeeUsername}`,
      });
    }

    await followModel.findByIdAndDelete(isUserFollowing._id);

    return res.status(200).json({
      message: `You successfully unfollowed ${followeeUsername}`,
    });
  } catch (error) {
    console.error("Unfollow error:", error);

    return res.status(500).json({
      message: "Failed to unfollow user",
    });
  }
}

module.exports = {
  followController,
  unFollowController,
};
