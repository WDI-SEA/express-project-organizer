var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();

router.get('/', function(req, res){
  db.category.findAll().then(function(categories){
    res.render('categories/index', {categories: categories});
  });
});

router.get('/:id', function(req, res){
  db.category.findOne({
    where: {id: req.params.id},
    include: [db.project]
  }).then(function(category){
    res.render('categories/show', {category: category});
  })
});


module.exports = router;
