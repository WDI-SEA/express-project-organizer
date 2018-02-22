var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();

router.get('/', function(req, res) {
  console.log(req.body)
  db.category.findAll()
  .then(function(categories) {
    console.log(categories)
    res.render('categories/allCategories', { categories: categories });
  });
});

router.get('/:id', function(req, res) {
  db.category.findOne({
    where: {id: req.params.id},
    include: [db.project]
  }).then(function(categories) {
    res.render('categories/show', {categories: categories});
  });
});

module.exports = router;
