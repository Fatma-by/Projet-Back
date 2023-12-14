// importing express module
const express = require("express");
// creating express instance
const app = express();
// injecting env variables
require("dotenv").config();
// importing mongoose module
const mongoose = require("mongoose");
const checkAuth = require("./checkAuth");
// db connection
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/user", require("./routes/auth.routes"));
app.use("/auth", checkAuth, require("./routes/private.routes"));
app.listen(8081, () => console.log("Server is running on port 8081"));
