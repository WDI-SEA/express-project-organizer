var async = require('async');
var express = require('express');
var db = require('../models');
var router = express.Router();

// Route for Posting categories
router.get('/', function(req, res) {
  res.send('stub for categories');
});


module.exports = router;