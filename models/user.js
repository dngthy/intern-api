const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    default: "unknown name",
    unique: true,
  },

  age: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
