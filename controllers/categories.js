var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  db.category.findAll()
  .then(function(categories) {
    res.render('categories/categories', {categories: categories});
  })
});

module.exports = router;
