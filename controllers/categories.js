var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  db.category.findAll().then(function(category){
  res.send(category);
  })
});



module.exports = router;
