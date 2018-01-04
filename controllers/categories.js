var express = require('express');
var async = require('async');
var db = require('../models');
var router = express.Router();

// Show all categories that exist
router.get('/', function(req, res){
  db.category.findAll().then(function(categories){
    res.render('categories/all', {categories: categories});
  });
});

// Show page with all projects associated with one category
router.get('/:id', function(req, res){
  db.category.findOne({
    where: {id: req.params.id},
    include: [db.project]
  }).then(function(categories){
    res.render('categories/single', {categories: categories});
  });
});



module.exports = router;



