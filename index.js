require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "shoes",
});

const shoesRouter = require("./router/api/v1/shoes.js");
const usersRouter = require("./router/api/v1/users.js");

app.use("/api/v1/shoes", shoesRouter);
app.use("/api/v1/users", usersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
