var express = require('express');
var db = require('../models');
var router = express.Router();
var PrettyError = require('pretty-error');
var pe = new PrettyError();

// GET /categories/ - displays all categories
router.get('/', function(req, res) {
  db.category.findAll({
    include: [db.project]
  })
        .then(function(categories) {
          res.render('categories/index', { categories: categories });
        })
        .catch(function(error) {
          console.log(pe.render(error));
          res.status(400).render('main/404');
        });
});

// GET /categories/:id - displays category of the id passed in the parameter
router.get('/:id', function(req, res) {
  db.category.find({
    where: {
      id: req.params.id
    },
    include: [db.project]
  })
        .then(function(category) {
          console.log(JSON.stringify(category));
          res.render('categories/show', { category: category });
        })
        .catch(function(error) {
          console.log(pe.render(error));
          res.status(400).render('main/404');
        });
});

module.exports = router;
