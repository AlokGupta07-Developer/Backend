const mongoose = require("mongoose")

const postSchema = new mongoose.Schema(
    {
        imgURL: {
            type: String,
            required: [true, "Image must be required for creating an post"]
        },
        caption: {
            type: String,
            default: "",
            trim: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: [true, "Post must belong to a user"],
        }
    },
    {timestamps: true}
)

const postsModel = mongoose.model("posts", postSchema)

module.exports = postsModel