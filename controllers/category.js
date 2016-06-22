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

// GET /projects/:id - display a specific project
  router.get('/:id', function(req, res) {
    db.category.find({
      where: { id: req.params.id }
    })
    .then(function(category) {
      if (!category) throw Error();
      res.render('category', { category: category });
    })
    .catch(function(error) {
      res.status(400).render('main/404');
    });
  });

module.exports = router;
