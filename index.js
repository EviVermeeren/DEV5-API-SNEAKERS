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







// const userSchema = new mongoose.Schema({
//   userName: String,
//   userPassword: String,
//   userEmail: String,
// });

// Create a User model
// const User = mongoose.model("User", userSchema);

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

// Endpoint to log in
app.post("/api/v1/login", async (req, res) => {
  const { userName, userPassword } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ userName, userPassword });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    // Send the token in the response
    res.json({
      status: "success",
      message: "Login successful",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

app.put("/api/v1/users/:id/update-password", async (req, res) => {
  const userId = req.params.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Check if the current password matches the one in the database
    if (user.userPassword !== currentPassword) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: Incorrect current password",
      });
    }

    // Update the user's password with the new one
    user.userPassword = newPassword;

    // Save the updated user to the database
    await user.save();

    res.json({
      status: "success",
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

// Endpoint to logout
app.post("/api/v1/logout", (req, res) => {
  // In a real-world scenario, you might want to handle token blacklisting or other logout mechanisms.
  // For simplicity, we'll just send a success response for now.
  res.json({
    status: "success",
    message: "Logout successful",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
