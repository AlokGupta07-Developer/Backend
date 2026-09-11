const app = require("./src/app")
const mongoose = require("mongoose")


function connectToDb() {
    mongoose.connect("mongodb+srv://alok-07:Alok18072003@cluster0.essbbdt.mongodb.net/day-server")
    .then(()=>{
        console.log("Database connected")
    })
}

connectToDb()

app.listen(3000,()=>{
    console.log("server running on port 3000")

})
