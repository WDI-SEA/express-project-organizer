var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
 db.category.findAll().then(function(category){
  res.render('categories/show.ejs', { category: category });
 })
});

router.get('/:name', function(req, res) {
 db.category.find({
   where: { name: req.params.name },
   include: [db.project]
 }).then(function(name) {
   res.render('categories/details', { name });
 })
});

module.exports = router;