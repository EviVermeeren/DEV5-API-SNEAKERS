const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newSneakerSchema = new Schema(
  {
    shoeType: String,
    shoeSize: Number,
    shoeColorSole: String,
    shoeColorLaces: String,
    shoeColorPanelDown: String,
    shoeColorPanelUp: String,
    shoeMaterialPanelDown: String,
    shoeMaterialPanelUp: String,
    jewel: String,
    initials: String,
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

module.exports = Shoe;
