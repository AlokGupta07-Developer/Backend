const mongoose = require('mongoose')

function connectToDb() {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Database Successfully Connected")
    })
}

module.exports = connectToDb