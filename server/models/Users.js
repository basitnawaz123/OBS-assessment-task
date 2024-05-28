const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = users = mongoose.model("users", userSchema);
