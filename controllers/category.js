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

router.get('/:id', function(req, res) {
  db.category.findAll({
    where: { id: req.params.id }
  })
  .then(function(category) {
    console.log(category);
    if (!category) throw Error();
    res.render('category/index', { category: category });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;

