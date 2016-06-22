var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res) {
  db.category.findAll({
    order: 'name ASC'
  }).then(function(categories) {
    res.render('projects/categories', { cats: categories });
  });
});

router.get('/:id', function(req, res) {

  db.category.find({
    where: { id: req.params.id }
  })
  .then(function(event) {
    event.getProjects().then(function(proj) {
      res.render('projects/category', { projects: proj });
    });
  });

});

module.exports = router;
