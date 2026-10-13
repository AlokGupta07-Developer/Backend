const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            unique: true,
            required: [true, "userName must be required"],
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: [true, "email must be required"],
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, "Password must be required"],
            minlength: [8, "Password must be minimum 8 length"]
        },
        bio: {
            type: String,
            default: "New insta user"
        },
        profilePicture: {
            type: String,
            default: "https://ik.imagekit.io/klmnopqrs1t/Default_pfp.jpg?updatedAt=1789626732478"
        }
    },
    {timestamps: true}
)

const usersModel = mongoose.model("users", usersSchema)

module.exports = usersModel