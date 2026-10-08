const userModel = require("../model/auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { email, userName, password, bio, profilePicture } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ email }, { userName }],
  });

  if (isUserAlreadyExist) {
    res.status(409).json({
      message:
        isUserAlreadyExist.email === email
          ? "User already exist with this email address"
          : "useralready exist with this userName",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    email,
    userName,
    password: hashPassword,
    bio,
    profilePicture,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("Token", token);

  res.status(201).json({
    message: "User registered successfully",
    user,
  });
}

async function loginController(req, res) {
  const { email, userName, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ email }, { userName }],
  });

  if (!user) {
    res.status(403).json({
      message: "Invalid email or userName",
    });
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!matchPassword) {
    return res.status(401).json({
      message: "Invalid Password",
    });
  }

  const users = await userModel.find({
    email: user.email,
    userName: user.userName,
    bio: user.bio,
    profilePicture: user.profilePicture,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("Token", token);

  res.status(200).json({
    message: "User logged in successfully",
    users,
  });
}

module.exports = {
  registerController,
  loginController,
};
