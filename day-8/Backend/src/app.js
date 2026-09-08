const express = require("express");
const app = express();
const mongoose = require("mongoose");
const noteModel = require("./models/notesModels");
const cors = require("cors");
const path = require("path");

//Middleware.......
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

//post API........
app.post("/api/notes", async (req, res) => {
  console.log(res.body);
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

//Get API
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes created successfully",
    notes,
  });
});

//Delete API
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findByIdAndDelete(id);
  console.log(id);

  res.status(200).json({
    message: "note deleted successfully",
  });
});

//Patch API
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "note updated successfully",
  });
});

console.log(__dirname);
//wild card route
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
