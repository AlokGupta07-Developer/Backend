const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: " ",
  },
  imgURL: {
    type: String,
    required: [true, "imgURL is required for creating an post"],
  },
  user: {
    ref: "users",   //Take refference from users collection
    type: mongoose.Schema.Types.ObjectId,       //Identify which user create post
    required: [true, "UserId is required for creating post"],
  },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
