var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /categories - create a new category
router.post('/', function(req, res) {
  db.category.create({
    name: req.body.name,
    description: req.body.description
  })
  .then(function(project) {
    res.redirect('/');
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /categories/new - display new catgory form
router.get('/new', function(req, res) {
  res.render('categories/new');
});

//GET /categories
router.get('/', function(req, res) {
  res.render('categories');
})


module.exports = router;
