const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  
  age: {
    type: Number,
    required: true,
    default: 0,
  },

  gender: {
    type: String,
    default: "", 
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  address: {
    type: String
  }
});

module.exports = mongoose.model("User", userSchema);
