var express = require('express');
var db = require('../models');
var router = express.Router();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

router.get('/', function(req, res) {
  res.render('show.ejs');
})

module.exports = router;
