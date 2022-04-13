const res = require('express/lib/response');
const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Hero', heroSchema);
