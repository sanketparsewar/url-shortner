const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "NORMAL", // NORMAL or ADMIN
    },
  },
  { timeStamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
