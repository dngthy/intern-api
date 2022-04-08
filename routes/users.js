const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const router = express.Router();

function authenticateToken(req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
    if (err) return res.sendStatus(403);
  });
}

router.post('/login', async function (req, res) {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send('All input is required');
    }

    const user = await User.findOne({ username });
    if (!user) res.status(400).send('Unauthorize because not user found');
    
    await bcrypt.compare(password, user.password, (err, same) => {
      if (!same) res.status(400).send('Unauthorize because data is incorrect');
      
      const token = jwt.sign({ username, password }, process.env.SECRET_JWT, {
        expiresIn: '7200s',
      });
      user.token = token;
      res.status(200).json(user);
    });
  } catch (e) {
    res.status(400).send('Unauthorize because cannot carry out');
  }
});


router.get('/get-list-user', async function (req, res) {
  authenticateToken(req, res);
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/find-user/:username', async function (req, res) {
  try {
    const username = { username: req.params.username.toLowerCase() };
    const data = await User.findOne(username);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/create-user', async function (req, res, next) {
  encryptedPassword = await bcrypt.hash(req.body.password, 10);
  const { username, age, firstName, lastName, email, address, gender } = req.body;
  const user = new User({
    username: username.toLowerCase(),
    password: encryptedPassword,
    age, firstName, lastName, email, address, gender,
  });
  try {
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
});
router.patch('/update-user/:username', async (req, res) => {
  authenticateToken(req, res);
  try {
    const username = { username: req.params.username };
    const updatedData = req.body;
    const options = { new: true };

    const result = await User.findOneAndUpdate(username, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/delete-user/:username', async (req, res) => {
  authenticateToken(req, res);
  try {
    const username = { username: req.params.username };
    const data = await User.findOneAndDelete(username);
    res.send(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
