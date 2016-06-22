var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /categories --view all categories at once
router.get('/', function(req, res) {
  db.category.findAll()
  .then(function(categories) {
    res.render('categories/showcats.ejs', { categories: categories});
  })
});

// GET /categories/:name --view category of matching name from the category table
 router.get('/:name', function(req, res) {
   db.category.find({
     where: {
       name: req.params.name
     }
   })
   // promise -- if cat doesn't exist then get projects
   .then(function(category) {
     if (!category) throw Error();
       category.getProjects()
       // promise -- display projects
       .then(function(projects){
         res.render('categories/groupbycat.ejs', { projects: projects });
       })
   })
   .catch(function(error) {
     console.log(error);
     res.status(400).render('main/404');
   });
 });

module.exports = router;
