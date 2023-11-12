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

app.get("/api/v1/shoes", async (req, res) => {
  const userId = req.query.user;
  const shoeId = req.query.id;

  try {
    if (shoeId) {
      // Handle requests with a shoe ID to retrieve a specific shoe
      const shoe = await Shoe.findById(shoeId);

      if (!shoe) {
        return res.status(404).json({
          status: "error",
          message: "Shoe not found",
        });
      }

      return res.json({
        status: "success",
        message: `GETTING shoe with ID ${shoeId}`,
        data: {
          shoe,
        },
      });
    } else if (userId) {
      // Handle requests with a user ID to retrieve shoes by user
      const shoes = await Shoe.find({ user: userId });
      return res.json({
        status: "success",
        message: `GET shoes with user ID ${userId}`,
        data: {
          shoes,
        },
      });
    } else {
      // Handle requests without ID or user ID to retrieve all shoes
      const shoes = await Shoe.find({});
      return res.json({
        status: "success",
        message: "GETTING all shoes",
        data: {
          shoes,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

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
