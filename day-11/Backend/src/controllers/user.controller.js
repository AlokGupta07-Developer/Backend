const followModel = require("../model/followModel");
const userModel = require("../model/usersModel");

async function followUserController(req, res) {
  const followerUsername = req.user.userName;
  const followeeUsername = req.params.userName;

  if (followerUsername == followeeUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const isFolloweeExist = await userModel.findOne({
    userName: followeeUsername,
  });

  if (!isFolloweeExist) {
    return res.status(404).json({
      message: "User you are trying to follow does not exist",
    });
  }

  const isAlreadyFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (isAlreadyFollowing) {
    return res.status(200).json({
      message: `You already follow ${followeeUsername}`,
      follow: isAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  return res.status(201).json({
    message: `You are now following ${followeeUsername}`,
    follow: followRecord,
  });
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.userName;
  const followeeUsername = req.params.userName;

  const isUserFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isUserFollowing) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  await followModel.findByIdAndDelete(isUserFollowing._id);
  return res.status(200).json(
    {
      message: `You unfollow ${followeeUsername}`
    }
  )

}

module.exports = {
  followUserController,
  unfollowUserController,
};
