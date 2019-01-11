var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/categories', function(req, res) {
  db.category.findAll().then(function(categories) {
    res.send(categories);
  });
});
