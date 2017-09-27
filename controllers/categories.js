var express = require('express');
var db = require('../models');
var router = express.Router();

router.get("/", function(req, res){
  res.send("Get page");
});

router.get("/:id", function(req, res){
  res.send("Temp page");
});

module.exports = router;
