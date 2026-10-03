const mongoose = require('mongoose')

//Before store data into DB first to make schema...
const noteSchema = new mongoose.Schema({  
    title: String,
    description: String,
})

//Collection: notes
const noteModel = mongoose.model('notes',noteSchema)  

module.exports = noteModel


