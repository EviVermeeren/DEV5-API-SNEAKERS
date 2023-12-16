const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../../../models/User");
const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret";

const index = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({
      status: "success",
      message: "GETTING all users",
      data: {
        users,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const create = async (req, res) => {
  const { userName, userPassword, userEmail } = req.body.user;

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
};

const login = async (req, res) => {
  console.log("Login route accessed");

  const { userName, userPassword } = req.body;

  try {
    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      userPassword,
      user.userPassword
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    if (isPasswordValid) {
      const token = jwt.sign(
        { userId: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      console.log("Generated Token:", token);

      res.json({
        status: "success",
        message: "Login successful",
        data: {
          user,
          token,
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

const updatePassword = async (req, res) => {
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

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.userPassword
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized: Incorrect current password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.userPassword = hashedPassword;

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
};

const logout = async (req, res) => {
  res.json({
    status: "success",
    message: "Logout successful",
  });
};

module.exports = {
  index,
  create,
  login,
  updatePassword,
  logout,
};
