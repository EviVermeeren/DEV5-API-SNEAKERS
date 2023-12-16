const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: String,
  userPassword: String,
  userEmail: String,
  isAdmin: { type: Boolean, default: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
