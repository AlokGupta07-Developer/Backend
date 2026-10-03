//Require essentials...
const express = require("express");
const app = express();
const noteModel = require("./models/notes.models");

//Middleware
app.use(express.json()); 

//Method: POST, name: /notes
app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Notes created successfully",
    note,
  });
});

//Method: GET, name: /notes
app.get("/notes", async (req, res) => {
  const note = await noteModel.find();

  res.status(200).json({
    message: "Note fetched successfully",
    note,
  });
});

//Method: DELETE, name: /notes/id
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const note = await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
    note
  });
});

//Method: PATCH, name: /notes/id
app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  const note = await noteModel.findByIdAndUpdate(
    id,
    { description },
    { new: true },
  );

  res.status(200).json({
    message: "Description updated successfully",
    note,
  });
});

module.exports = app;
