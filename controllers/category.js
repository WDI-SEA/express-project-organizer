var express = require('express');
var db = require('../models');
var router = express.Router();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

router.get('/', function(req, res) {
  db.category.findAll()
  .then(function(categories) {
  res.render('categories/show.ejs', { categories: categories })
  })
})

// GET /categories/:id - display a list of categories
  router.get('/:name', function(req, res) {
    db.category.find({
      where: {
        name: req.params.name
      }
    })
    .then(function(category) {
      if (!category) throw Error();
      //render a projects page that contain a certain category
        category.getProjects().then(function(projects){
          res.render('categories/new', { projects: projects });
      })
    })
    .catch(function(error) {
      console.log(error);
      res.status(400).render('main/404');
    });
  });


module.exports = router;
