var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  db.category.findAll().then(function(category){
  res.render('categories/show.ejs', { category: category });
  })
});



module.exports = router;
