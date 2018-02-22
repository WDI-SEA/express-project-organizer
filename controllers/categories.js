var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');

// GET /categories - display form to create new category
router.get('/', function(req, res){
  db.category.findAll().then(function(categories){
    res.render('categories/show', {categories:categories});
  });
});

// GET /categories/:id - display list of projects by category
router.get('/categories/:id', function(req, res){
  console.log('in category/id path');
  db.category.find({
    where: {id:req.params.id},
    include: [db.project]
  })
  .then(function(category){
    if (!category) throw Error();
    res.render('categories/new', {category:category});
  })
  .catch(function(error){
    res.status(400).render('main/404');
  });
});

// EDIT /categories/:id
router.put('/categories/:id', function(req,res){
  console.log('in category/id PUT path');

});

// DELETE /categories/:id
router.delete('/categories/:id', function(req,res){
  console.log('in category/id DELETE path');

});

module.exports = router;
