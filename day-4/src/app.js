const express = require("express");

const app = express();

app.use(express.json());  //Middleware

const notes = [];         //Blank array

//Method: POST, API name: notes
app.post("/notes", (req, res) => {
  console.log(req.body)
  notes.push(req.body);
  console.log(notes);

  res.send("Notes created");
});

//Method: GET, API name: notes
app.get("/notes", (req, res) => {
  res.send(notes);
});

//Method: DELETE, API name: notes
app.delete("/notes/:index", (req, res) => {
  console.log(req.params.index);
  delete [req.params.index];
  res.send("Note deleted");
});

//Method: PATCH, API name: notes
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].title = req.body.title;
  res.send("Notes title update successfully");
});

module.exports = app;
