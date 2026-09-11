const express = require("express");
const app = express();
const mongoose = require("mongoose");
const noteModel = require("./models/notes.models");

app.use(express.json()); //Middleware

//POST
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

//GET
app.get("/notes", async (req, res) => {
  const note = await noteModel.find();

  res.status(200).json({
    message: "Note send successfully",
    note,
  });
});

//DELETE
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const note = await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

//PATCH
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
