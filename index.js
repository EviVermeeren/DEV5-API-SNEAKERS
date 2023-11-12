const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://evivermeeren:wachtwoord@cluster0.plf34zk.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "shoes",
  }
);

const newSneakerSchema = new mongoose.Schema( //dit is een schema, hierin geef je aan welke velden je wil hebben in je db
  {
    user: String,
    shoeType: String,
    shoeSize: Number,
    shoeColorSole: String,
    shoeColorLaces: String,
    shoeColorPanelDown: String,
    shoeColorPanelUp: String,
    shoeMaterialPanelDown: String,
    shoeMaterialPanelUp: String,
  },
  {
    collection: "shoes", //dit is de naam van de collection in de db
  }
);

const Shoe = mongoose.model("Shoe", newSneakerSchema);

app.post("/api/v1/shoes", async (req, res) => {
  // Assuming req.body.shoe is an object containing the shoe details
  const {
    user,
    shoeType,
    shoeSize,
    shoeColorSole,
    shoeColorLaces,
    shoeColorPanelDown,
    shoeColorPanelUp,
    shoeMaterialPanelDown,
    shoeMaterialPanelUp,
  } = req.body.shoe;

  const newShoe = new Shoe({
    user,
    shoeType,
    shoeSize,
    shoeColorSole,
    shoeColorLaces,
    shoeColorPanelDown,
    shoeColorPanelUp,
    shoeMaterialPanelDown,
    shoeMaterialPanelUp,
  });

  try {
    const shoe = await newShoe.save();
    res.json({
      status: "success",
      message: `POSTING a new shoe for user ${user}`,
      data: {
        shoe,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to save shoe",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
