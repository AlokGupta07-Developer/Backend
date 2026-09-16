require("dotenv").config();
const app = require("./src/app");
const connectToDb = require("./src/config/database");

//To start the server
app.listen(3000, () => {
  console.log("server is running on port 3000");
});

//To connecting database
connectToDb();
