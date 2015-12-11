var models = require('../models');
var express = require('express');
var router = express.Router();

router.post('/create', (req, res) => {
  User.authenticate(
    req.body.username,
    req.body.password
  ).then((result) => {
    res.status(200).json(result);
  }, (err) => {
    res.status(500).json(err);
  });
});

module.exports = router;
