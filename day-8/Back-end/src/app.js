const express = require("express");
const app = express();
const notesModel = require("./model/notesModel");
const cors = require("cors")
const path = require("path")

//A dd middleware without this show undefined
app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname, "..", "public")))

//To create notes... APIs name: notes, method: POST
app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await notesModel.create({
    title,
    description,
  });
  res.status(201).json({
    message: "Note created successfully",
  });
});

//To see notes... APIs name: notes, method: GET
app.get("/notes", async (req, res) => {
  const note = await notesModel.find();

  res.status(200).json({
    message: "Fetch notes successfully",
    note,
  });
});

//To Delete notes... APIs name: notes, method: DELETE
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  await notesModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

//To Update partial notes... APIs name: notes, method: PATCH
app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  await notesModel.findByIdAndUpdate(id, { title, description });

  res.status(200).json({
    message: "note title and description updated successfully",
  });
});

//To create wild card route
app.use("*name",(req,res)=>{
  res.sendFile(path.join(__dirname, "/public", "index.html"))
})
module.exports = app;
