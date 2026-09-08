const express = require('express')
const app = express()

app.use(express.json())
const notes = []

app.post('/notes',(req,res)=>{
    notes.push(req.body)
    res.status(201).json({
        message: "Note Created Successfully"
    })
})

app.get('/notes',(req,res)=>{
    res.status(200).json({
        notes:notes
    })
})

app.delete('/notes/:index',(req,res)=>{
    notes[req.params.index]
    console.log(req.params.index)

})

app.patch('/notes/:index', (req, res) => {

    notes[req.params.index].Description1 = req.body.Description1;

    res.status(200).json({
        message: "Notes Updated Successfully"
    });
});
module.exports = app