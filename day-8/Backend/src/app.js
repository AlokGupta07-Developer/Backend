const express = require("express")
const app = express()
const noteModel = require("./model/notesModel")
const cors = require("cors")
const path = require("path")

module.exports = app

app.use(express.json())  //Middleware
app.use(cors())  //cors policy used to run frontend & backend on diffrent port
app.use(express.static(path.join(__dirname, "public")))

//To  create note Method: POST, name: notes
app.post("/notes",async (req,res)=>{
    const {title, description} = req.body
    console.log(req.body)
    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message: "Note created Successfully",
    })
})

//To fetch note method: GET, name:notes
app.get("/notes",async (req,res)=>{
    const note = await noteModel.find()

    res.status(200).json({
        message: "Note fetch successfully",
        notes: note
    })
})

//To delete note method: DELETE, name: notes
app.delete("/notes/:id", async (req,res)=>{
    const id = req.params.id
    console.log(id)
    const note = await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully",
        note //show deleted note
    })
})

//To update note method: PATCH, name: notes
app.patch("/notes/:id", async (req, res) => {
    const id = req.params.id
    const { title, description } = req.body

    const note = await noteModel.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
    )

    res.status(200).json({
        message: "Title and description updated successfully",
        note
    })
})


app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname, "/public/index.html"))
})