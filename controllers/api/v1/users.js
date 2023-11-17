const User = require("../../models/User");

const create = async (req, res) => {
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
};

module.exports = {
    create,
};
