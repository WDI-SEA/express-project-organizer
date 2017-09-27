var express = require('express');
var bodyParser = require('body-parser');
var db = require('../models');
var router = express.Router();



//find all of the categories in the table and put them on the main category page
router.get('/', function(req, res) {
  db.category.findAll().then(function(categories){
    res.render('categories/main', { categories: categories });
  });
});


//get the category by id and show all the associated projects
router.get('/:id', function(req, res) {
  db.category.find({
    where: {id: req.params.id}
  }).then(function(category) {
    category.getProjects().then(function(projects) {
      res.render('categories/show', { projects:projects, category:category })
    });
  });
});




module.exports = router;
