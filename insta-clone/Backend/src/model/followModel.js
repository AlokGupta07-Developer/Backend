const mongoose = require("mongoose")

const followSchema = new mongoose.Schema(
    {
        follower: String,
        followee: String
    },
    {
        timestamps: true
    }
)

followSchema.index({followee:1, follower:1}, {unique: true})
const followModel = mongoose.model("follow", followSchema)

module.exports = followModel