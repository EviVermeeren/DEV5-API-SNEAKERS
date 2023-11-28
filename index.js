require("dotenv").config();
const express = require("express");
const http = require("http");
const Primus = require("primus");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

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
const primus = new Primus(server, { transformer: "websockets" });

primus.on("connection", (spark) => {
  console.log("connected");
  spark.on("data", (data) => {
    console.log(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
