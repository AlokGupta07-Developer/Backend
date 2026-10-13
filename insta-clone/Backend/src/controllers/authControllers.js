const usersModel = require("../model/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function usersRegisterController(req, res) {
  const { userName, email, password, bio, profilePicture } = req.body;

  try {
    const isUserAlreadyExist = await usersModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (isUserAlreadyExist) {
      return res.status(409).json({
        message:
          isUserAlreadyExist.email === email
            ? "Email address already exist... Please try to use another email address"
            : "userName already exist... Please try to use another userName",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await usersModel.create({
      userName,
      email,
      password: hash,
      bio,
      profilePicture,
    });

    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );

    res.cookie("Token", token);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);
  }
}

async function usersLoginController(req, res) {
  try {
    const { userName, email, password } = req.body;

    const user = await usersModel.findOne({
      $or: [{ userName }, { email }],
    });

    if (!user) {
      return res.status(403).json({
        message: "Unautherized access",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        userName: user.userName,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );

    res.cookie("Token", token);

    res.status(200).json({
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
  }
}


module.exports = {
  usersRegisterController,
  usersLoginController,
};
