const express = require("express")
const mongoose = require("mongoose")
const noteModel = require("./model/notesModel")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.post("/notes",async(req,res)=>{
    const {title,description} = req.body
    const notes = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message: "Note created successfully",
        notes
    })

})

app.get("/notes",async(req,res)=>{
    const notes = await noteModel.find()

    res.status(200).json({
        message: "Note fetch successfully",
        notes
    })
})

app.patch("/notes/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    const {description} = req.body
    const notes = await noteModel.findByIdAndUpdate(id, { description })

    res.status(200).json({
        message: "Note Updated successfully",
    })

})

app.delete("/notes/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully",
    })

})
module.exports = app