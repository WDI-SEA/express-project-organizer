var express = require('express');
var db = require('../models');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var router = express.Router();

router.get('/show', function(req, res) {
  res.render('category/show');
});

module.exports = router;
