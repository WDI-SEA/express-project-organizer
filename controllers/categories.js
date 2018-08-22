var express = require('express');
var db = require('../models');
var router = express.Router();

// get index
router.get('/', function(req, res) {
  db.category.findAll().then(function(categories) {
      res.render('categories/index', { categories: categories });
    }).catch(function(error) {
      // don't do it nph!
      res.status(400).render('main/404');
    });
});

// get specific

module.exports = router;
