const Shoe = require("../../../models/Shoe.js");

const index = async (req, res) => {
  const userId = req.query.user;
  const shoeId = req.query.id;

  try {
    if (shoeId) {
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
      const shoes = await Shoe.find({ user: userId });
      return res.json({
        status: "success",
        message: `GET shoes with user ID ${userId}`,
        data: {
          shoes,
        },
      });
    } else {
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
};

const create = async (req, res) => {
  const {
    shoeType,
    shoeSize,
    shoeColorSole,
    shoeColorLaces,
    shoeColorPanelDown,
    shoeColorPanelUp,
    shoeMaterialPanelDown,
    shoeMaterialPanelUp,
    jewel,
    initials,
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
    jewel,
    initials,
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
};

const destroy = async (req, res) => {
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
};

const updateStatus = async (req, res) => {
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
};

module.exports = {
  index,
  create,
  destroy,
  updateStatus,
};
