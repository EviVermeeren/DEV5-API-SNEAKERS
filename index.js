require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const WSPort = 3001;

app.use(express.json());
app.use(cors());

// const jwt = require("jsonwebtoken");
// const secretKey = "your_secret_key"; // Replace with your actual secret key

mongoose.connect(
  process.env.MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "shoes",
  }
);

const shoesRouter = require("./router/api/v1/shoes.js");
const usersRouter = require("./router/api/v1/users.js");

app.use("/api/v1/shoes", shoesRouter);
app.use("/api/v1/users", usersRouter);

const server = http.createServer(app);
require('./primus/live.js').go(server);
server.listen(WSPort);



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
