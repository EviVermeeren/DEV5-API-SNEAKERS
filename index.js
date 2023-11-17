require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const cors = require("cors");
app.use(cors());

const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key"; // Replace with your actual secret key

const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "shoes",
  }
);

const shoesRouter = require("./router/api/v1/shoes.js");

app.use("/api/v1/shoes", shoesRouter);

const usersRouter = require("./router/api/v1/users.js");

app.use("/api/v1/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
