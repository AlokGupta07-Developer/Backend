const mongoose = require("mongoose")
async function connectToDb() {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Database connected")
}


module.exports = connectToDb