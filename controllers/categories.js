var express = require('express');
var db = require('../models');
var router = express.Router();

// get index of categories
router.get('/', function(req, res) {
  db.category.findAll().then(function(categories) {
      res.render('categories/index', { categories: categories });
    }).catch(function(error) {
      // don't do it nph!
      res.status(400).render('main/404');
    });
});

// get specific category & show projects listed under
router.get('/:id', function(req, res) {
  var ident = parseInt(req.params.id);
  db.category.findById(ident).then(function(category) {
    res.send('you reached category ' + category.id + '\'s show page');
  }).catch(function(err) {
    // no nph plz
    res.send('a less aggrivating 404 page');
  });
});

module.exports = router;
