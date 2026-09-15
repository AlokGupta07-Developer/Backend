const mongoose = require("mongoose")

function connectToDb() {
    mongoose.connect("mongodb+srv://alok-07:Alok18072003@cluster0.asdxsyh.mongodb.net/day-practice")
    .then(()=>{
        console.log("Database connected")

    })
}

module.exports = connectToDb