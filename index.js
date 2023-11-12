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

const newSneakerSchema = new mongoose.Schema(
  {
    shoeType: String,
    shoeSize: Number,
    shoeColorSole: String,
    shoeColorLaces: String,
    shoeColorPanelDown: String,
    shoeColorPanelUp: String,
    shoeMaterialPanelDown: String,
    shoeMaterialPanelUp: String,
    status: { type: String, default: "Order placed" },
    userName: String,
    userAddress: String,
    userEmail: String,
  },
  {
    collection: "shoes",
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
  const {
    shoeType,
    shoeSize,
    shoeColorSole,
    shoeColorLaces,
    shoeColorPanelDown,
    shoeColorPanelUp,
    shoeMaterialPanelDown,
    shoeMaterialPanelUp,
    status,
    userName,
    userAddress,
    userEmail,
  } = req.body.shoe;

  const newShoe = new Shoe({
    shoeType,
    shoeSize,
    shoeColorSole,
    shoeColorLaces,
    shoeColorPanelDown,
    shoeColorPanelUp,
    shoeMaterialPanelDown,
    shoeMaterialPanelUp,
    status,
    userName,
    userAddress,
    userEmail,
  });

  try {
    const shoe = await newShoe.save();
    res.json({
      status: "success",
      message: `POSTING a new shoe for user ${userName}`,
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

app.delete("/api/v1/shoes/:id", async (req, res) => {
  const shoeId = req.params.id;

  try {
    const shoe = await Shoe.findByIdAndDelete(shoeId);

    if (!shoe) {
      return res.status(404).json({
        status: "error",
        message: "Shoe not found",
      });
    }

    return res.json({
      status: "success",
      message: `DELETING shoe with ID ${shoeId}`,
      data: {
        shoe,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Failed to delete shoe",
    });
  }
});

app.put("/api/v1/shoes/:id/status", async (req, res) => {
  const shoeId = req.params.id;
  const { status } = req.body;

  try {
    const shoe = await Shoe.findByIdAndUpdate(
      shoeId,
      { $set: { status } },
      { new: true }
    );

    if (!shoe) {
      return res.status(404).json({
        status: "error",
        message: "Shoe not found",
      });
    }

    return res.json({
      status: "success",
      message: `UPDATING status of shoe with ID ${shoeId}`,
      data: {
        shoe,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Failed to update shoe status",
    });
  }
});

// Define a User schema
const userSchema = new mongoose.Schema({
  userName: String,
  userPassword: String,
  userEmail: String,
});

// Create a User model
const User = mongoose.model("User", userSchema);

// Endpoint to add a new user
app.post("/api/v1/users", async (req, res) => {
  const { userName, userPassword, userEmail } = req.body;

  // Create a new user instance
  const newUser = new User({
    userName,
    userPassword,
    userEmail,
  });

  try {
    // Save the new user to the database
    const user = await newUser.save();
    res.json({
      status: "success",
      message: `POSTING a new user with username ${userName}`,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Failed to save user",
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
