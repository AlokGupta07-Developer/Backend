const app = require("./src/app");
const connectToDb = require("./src/config/database");
const noteModel = require("./src/models/notesModel")



app.listen(3000,()=>{
    console.log("server is running on port 3000")
})

//post
app.post("/notes",async (req,res)=>{
    console.log(req.body)
    const {title, description} = req.body
    const note = await noteModel.create({
        title,description
    })
    res.status(201).json({
        message: "Note created successfully",
        note
       
    })
})

app.get("/notes",async(req,res)=>{
    const note = await noteModel.find()

    res.status(200).json({
        message: "Note send successfully",
        note
    })
})

app.delete("/notes/:id",async(req,res)=>{
    const id = req.params.id
    console.log(id)
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "note deleted"
    })
})

connectToDb()