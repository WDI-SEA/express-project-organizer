var express = require('express');
var db = require('../models');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var router = express.Router();

router.get('/index', function(req, res) {
  db.category.findAll()
  .then(function(categories) {
  res.render('category/index', { categories: categories });
  })
});

router.get('/:name', function(req, res) {
  db.category.find({
    where: {
      name: req.params.name
     }
  })
  .then(function(category) {
    if (!category) throw Error();
      category.getProjects().then(function(projects) {
      res.render('category/show', { projects: projects });
    })
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;

