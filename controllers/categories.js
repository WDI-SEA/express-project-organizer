var express = require('express');
var db = require('../models');
var router = express.Router();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

router.get('/', function(req, res) {
  db.category.findAll()
  .then(function(categories) {
  res.render('categories/index', { categories: categories });
  })
});






module.exports = router;
