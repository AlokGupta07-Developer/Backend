const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: String
}, { timestamps: true });

const userModel = mongoose.model('users', userSchema)

module.exports = userModel