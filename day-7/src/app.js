const express = require("express")
const app = express()
const mongoose = require("mongoose");
const noteModel = require("./models/notes.models");


app.use(express.json())

app.post('/notes',async(req,res)=>{
    const {title,description} = req.body

    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message: "Notes created successfully",
        note
    })
})

app.get('/notes',async(req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Notes fetch successfully",
        notes
    })
})






module.exports = app