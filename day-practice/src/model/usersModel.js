const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    userName: String,
    email: {type: String, unique: true},
    password: String
})

const usersModel = mongoose.model("users",usersSchema)

module.exports = usersModel
