const express = require("express");
const userModel = require("../model/auth.model");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

//APIs method: POST, name: /api/auth/register, User registration API
authRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already exists with this email address",
    });
  }

  //User details save in DB
  const user = await userModel.create({
    email,
    username,
    password,
  });

  //Create tokens for registered users
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("JWT_token", token);

  res.status(201).json({
    message: "User Registered",
    user,
    token,
  });
});

module.exports = authRouter;
