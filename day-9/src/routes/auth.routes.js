const express = require('express');
const userModel = require('../model/notesModel');
const jwt = require('jsonwebtoken')


const authRouter = express.Router()

authRouter.post('/register',async(req,res)=>{
    const {username,email,password,} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists with this email address"
        })
    }

    const user = await userModel.create({
        email,username,password
    })

    const token = jwt.sign({
        id: user._id
    },
    process.env.JWT_SECRET
)

    res.cookie("JWT_token",token)
    
    res.status(201).json({
        message: "User Registered",
        user,
        token
    })
})

module.exports = authRouter