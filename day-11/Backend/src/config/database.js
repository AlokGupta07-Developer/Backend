const mongoose = require("mongoose");

async function connectToDb() {
  await mongoose.connect(process.env.MONGO_URI);  //Connecting database to the server
  console.log("Database connected");
}

module.exports = connectToDb;
