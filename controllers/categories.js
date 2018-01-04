var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require ('async');

router.get('/', function(req, res){
  db.category.findAll().then(function(categories) {
    res.render('categories/index', {categories: categories});
  });
});
router.get('/:id', function(req, res) {
  db.category.find({
    where: {id: req.params.id}
  }).then(function(category){
    res.render('categories/show', {category: category});
  });
});
module.exports = router;
