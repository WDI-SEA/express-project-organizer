var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();

//  GET all categories
router.get('/', function(req, res) {
  db.category.findAll().then(function(categories) {
    res.render('categories/allcategories', {categories: categories});
  });
});

//  GET particular/single category (by id)
router.get('/:id', function(req, res) {
  db.category.findOne({
    include: [db.project],
    where: {id: req.params.id}
  }).then(function(category) {
    res.render('categories/show', {category: category});
  });
});


module.exports = router;
