const express = require("express")
const authRouter = express.Router()
const authControllers = require("../controllers/authControllers")
const identifyUser = require("../middlewares/authMiddlewares")

//user Register API, method: POST, name: /api/auth/register
authRouter.post("/register", authControllers.usersRegisterController)

//user Login API, method: POST, name: /api/auth/login
authRouter.post("/login", authControllers.usersLoginController)

//Get data of current user logged in, method: GET, name: /api/auth/get-me

module.exports = authRouter