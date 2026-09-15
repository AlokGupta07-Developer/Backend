const express = require("express");
const jwt = require("jsonwebtoken")
const usersModel = require("../model/usersModel");
const crypto = require("crypto")

const authRouter = express.Router();
authRouter.post("/register", async (req, res) => {

    const { userName, email, password } = req.body

    const isUserAlreadyExist = await usersModel.findOne({ email })

    
    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User already exists with this email address"
        })
    }
    const hash = crypto.createHash("md5").update(password).digest("hex")
    
    const user = await usersModel.create({
        userName,
        email,
        password:hash
    })

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("JWT_Token", token)

    return res.status(201).json({
        message: "User registered",
        token,
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email
        }
        
    })

})

authRouter.post("/login",async(req,res)=>{
    const { email,password, userName } = req.body
    const user = await usersModel.findOne({email})

    if(!user) {
        return res.status(404).json({
            message: "user not exist with this email address"
        })
    }

    const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")

    if(!isPasswordMatched) {
        return res.status(401).json({
            message: "invalid password"
        })
    }

       const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET
    )

    res.cookie("JWT_Token", token)

    res.status(200).json({
        message: "user login successfully",
        user
    })



})
    
module.exports = authRouter;
