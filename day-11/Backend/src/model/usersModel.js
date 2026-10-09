const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: [true, "User name already exist"],
    required: [true, "UserName is required"],
    trim: true
  },
  email: {
    type: String,
    unique: [true, "Email already exist"],
    required: [true, "Email is required"],
    trim: true
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  bio: {
    type: String,
    default: "New insta user",
  },
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/klmnopqrs1t/Default_pfp.jpg",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
