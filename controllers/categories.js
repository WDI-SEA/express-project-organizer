var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();

// GET /projects/new - display form for creating a new project
router.get('/', function(req, res) {
  db.category.findAll()
  .then(function(categories) {
    res.render('categories/index', { categories: categories });
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
});

//GET particular / single category (by id)
router.get('/:id', function(req, res) {
  db.category.findOne({
    where: { id: req.params.id },
    include: [db.project]
  }).then(function(category) {
    res.render('categories/show', { category: category })
  });
});




module.exports = router;
