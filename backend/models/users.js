const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    min: 2,
    required: true,
  },
  email: {
    type: String,
    min: 2,
    required: true,
  },
  password: {
    type: String,
    min: 2,
    required: true,
  },
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;
