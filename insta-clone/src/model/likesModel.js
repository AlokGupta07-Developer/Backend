const mongoose = require("mongoose");

const likesSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "Post id must be required for creating like"],
    },
    user: {
      type: String,
      required: [true, "User must be required to like the post"],
    },
  },
  { timestamps: true },
);

likesSchema.index({ post: 1, user: 1 }, { unique: true });

const likesModel = mongoose.model("likes", likesSchema);

module.exports = likesModel;
