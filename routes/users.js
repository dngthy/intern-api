var express = require("express");
const mongoose = require("mongoose");
const User = require("../models/user");

var router = express.Router();


router.get("/getListUsers", async function (req, res, next) {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/findUser/:username", async function (req, res, next) {
  try {
    const username={username:req.params.username}
    const data = await User.findOne(username);
    res.json(data);
    return data
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post("/createUser", async function (req, res, next) {
  const user = new User({
    username: req.body.username,
    age: req.body.age,
    email: req.body.email,
    address: req.body.address,
    gender: req.body.gender
  });
  try {
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
  router.patch("/updateUser/:username", async (req, res) => {
    try {
      const username = { username: req.params.username };
      const updatedData = req.body;
      const options = { new: true };

      const result = await User.findOneAndUpdate(
        username,
        updatedData,
        options
      );
      res.send(result);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


  router.delete("/deleteUser/:username", async (req, res) => {
    try {
      const username = {username: req.params.username};
      const data = await User.findOneAndDelete(username);
      res.send(data)
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
});


module.exports = router;
