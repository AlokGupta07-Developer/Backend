const express = require("express")
const authRouter = express.Router()
const authControllers = require("../controllers/authControllers")

//user Register API, method: POST, name: /api/auth/register
authRouter.post("/register", authControllers.usersRegisterController)

//user Login API, method: POST, name: /api/auth/login
authRouter.post("/login", authControllers.usersLoginController)


module.exports = authRouter