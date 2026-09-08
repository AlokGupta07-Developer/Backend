const mongoose = require("mongoose")
const connectToDb = require("./src/config/database")
const app = require("./src/app")
require('dotenv').config()

connectToDb()



app.listen(3000,()=>{
    console.log("Server running....")
})

