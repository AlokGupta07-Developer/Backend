const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: String
    },
    followee: {
      type: String
    },
  },
  {
    timestamps: true,
  },
);

//Validation: if A follow B than A cannot be again follow B   
followSchema.index({follower:1, followee:1}, {unique: true})

const followModel = mongoose.model("follows", followSchema);


module.exports = followModel;
