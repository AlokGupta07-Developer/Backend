const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    imageURL: {
      type: String,
      required: [true, "Image must be required for creating an post"],
    },
    caption: {
      type: String,
      default: "",
    },
    userId: {
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "userId must be required for creating an post"],
    },
  },
  { timestamps: true },
);

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
