const express = require("express");
const app = express();

app.use(express.json());   //Middleware
const notes = [];          //Blank array

//APIs method: POST, name: notes
app.post("/notes", (req, res) => {
  notes.push(req.body);
  res.status(201).json({
    message: "Note Created Successfully",
  });
});

//APIs method: GET, name: notes
app.get("/notes", (req, res) => {
  res.status(200).json({
    notes: notes,
  });
});

//APIs method: DELETE, name: notes
app.delete("/notes/:index", (req, res) => {
  notes[req.params.index];
  console.log(req.params.index);
});

//APIs method: PATCH, name: notes
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].Description = req.body.Description;

  res.status(200).json({
    message: "Notes Description Updated Successfully",
  });
});
module.exports = app;
