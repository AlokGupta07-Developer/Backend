const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "email must be required"],
            unique: [true, "This email already exist"]
        },
        userName: {
            type: String,
            required: [true, "userName must be required"],
            unique: [true, "This username already exist"]
        },
        password: {
            type: String,
            required: [true, "Password must be required"]
        },
        bio: {
            type: String,
            default: ""
        },
        profilePicture: {
            type: String,
            default: "https://ik.imagekit.io/klmnopqrs1t/Code%20Alok.jpeg"
        }
    },
    { timestamps: true }
)

const userModel = mongoose.model("users", userSchema)

module.exports = userModel