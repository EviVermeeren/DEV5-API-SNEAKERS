const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://evivermeeren:wachtwoord@cluster0.plf34zk.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "shoes",
  }
);

app.use(express.json());

const cors = require("cors");
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
