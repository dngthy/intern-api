const express = require('express');
var jwt = require('jsonwebtoken');
const Hero = require('../models/hero');
const router = express.Router();
function authenticateToken(req, res) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_JWT, (err, user) => {
    if (err) return res.sendStatus(403);
  });
}
router.get('/find-hero/:id', async function (req, res) {
  authenticateToken(req, res);
  try {
    data = await Hero.findOne({ id: req.params.id });
    res.json(data);
  } catch (err) {
    res.send(500, { message: err.message });
  }
});
router.post('/create-hero', async function (req, res) {
  try {
    const newHero = new Hero({ id: req.body.id, name: req.body.name });
    data = await newHero.save();
    res.json(data);
  } catch (err) {
    res.send(500, { message: err.message });
  }
});
router.patch('/update-hero/:id', async function (req, res) {
  authenticateToken(req, res);
  try {
    const result = await Hero.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    res.json(result);
  } catch (err) {
    res.send(500, { message: err.message });
  }
});
router.delete('/delete-hero/:id', async function (req, res) {
  authenticateToken(req, res);
  try {
    const data = await Hero.findOneAndDelete({ id: req.params.id });
    res.send(200);
  } catch (err) {
    res.send(500, { message: err.message });
  }
});
module.exports = router;
