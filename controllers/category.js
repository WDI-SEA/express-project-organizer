var express = require('express');
var db = require('../models');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var router = express.Router();

router.get('/index', function(req, res) {
  res.render('category/index');
});
  // db.category.find({
  //   where: { id: req.params.id }
  // }).then(function(category) {
  //   if(!category) throw Error();
  //   res.render('category/index', { category: category });
  // })

router.get('/:id', function(req, res) {
  db.category.find({
    where: { id: req.params.id }
  })
  .then(function(category) {
    if (!category) throw Error();
    res.render('category/show', { category: category });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
