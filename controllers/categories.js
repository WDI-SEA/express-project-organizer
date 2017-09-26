var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res){
  db.category.findAll().then(function(categories) {
    res.render('categories/main', { categories: categories });
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
});

router.get('/:id', function(req, res){
  db.category.find({
    where: {id: req.params.id},
  }).then(function(category){
    category.getProjects().then(function(projects){
        res.render('categories/show', {projects:projects, category:category});
    });
  });
});



module.exports = router;
