const Shoe = require("../../../models/Shoe.js");

const index = async (req, res) => {
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
}