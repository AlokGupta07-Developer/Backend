const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({  //for formatting
    title: String,
    description: String,
})

const noteModel = mongoose.model('notes',noteSchema)  //notes: collection name, notemodel: create a model

module.exports = noteModel


