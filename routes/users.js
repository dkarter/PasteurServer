var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/create', (req, res) => {
  User.create({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  }).then((user) => {
    res.status(200).json(user);
  }, (err) => {
    res.status(500).json(err);
  });
});

module.exports = router;
