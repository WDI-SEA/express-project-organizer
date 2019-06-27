const express = require('express');
const router = express.Router();
const db = require('../models');
const async = require('async');

// GET /categories   show all categories
router.get('/', function(req,res) {
  db.category.findAll({
    include: [db.project]
  }).then(function(categories){
    res.render('categories/index', {categories});
  });
});

// GET /categories/:id   show all projects in 1 category
router.get('/:id', function(req,res) {
  db.category.findOne({
    where: {id: parseInt(req.params.id)},
    include: [db.project]
  }).then(function(cat) {
    res.render('categories/show', {cat})
  })
})


// POST /categories add a category to a post
router.post('/', function(req, res) {
  db.project.findOrCreate({
    where: {id:parseInt(req.body.projectId)}
  }).spread(function(project, created) {
    db.category.findOrCreate({
      where: {name: req.body.name}
    }).spread(function(category, created) {
      project.addCategory(category)
    }).then(function() {
      res.redirect('/projects/' + req.body.projectId);
    })
  })  
})

module.exports = router;