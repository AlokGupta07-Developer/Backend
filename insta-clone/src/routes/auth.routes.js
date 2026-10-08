const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controllers")

// API: method: POST user register /api/auth/register
authRouter.post("/register", authController.registerController)

//API method: POST user login  /api/auth/login
authRouter.post("/login", authController.loginController);

module.exports = authRouter;
