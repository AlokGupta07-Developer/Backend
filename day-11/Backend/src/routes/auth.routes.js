const express = require("express");
const authRouter = express.Router();    //If we perform routes instead of app.js file so we must write this
const authControllers = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware")

//API method: POST, /api/auth/register
authRouter.post("/register", authControllers.registerController);

//API Method: POST, /api/auth/login
authRouter.post("/login", authControllers.loginController);

authRouter.get("/get-me", identifyUser, authControllers.getMeController)

module.exports = authRouter;
