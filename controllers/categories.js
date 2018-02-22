var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /categories - display form to create new category
router.get('/', function(req, res){
  db.category.findAll().then(function(categories){
    res.render('categories/show', {categories:categories});
  });
});

// GET /categories/:id - display list of projects by category




module.exports = router;
