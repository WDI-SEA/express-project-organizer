var express = require('express');
var db = require('../models');
var router = express.Router();

// GET /categories - display all categories
router.get('/', function (req, res) {
  db.category.findAll()
    .then(function (categories) {
      res.render('categories/index', { categories: categories });
    })
    .catch(function (error) {
      res.status(400).render('main/404');
    });
});

// GET /categories/new - display a form for creating new category
router.get('/new', function (req, res) {
  res.render('categories/new');
});

// POST /categories - adds a new category
router.post('/', function (req, res) {
  db.category.create({
    name: req.body.name
  }).then(function (category) {
    console.log(category);
    res.redirect('/');
  }).catch(function (error) {
    res.status(400).render('main/404');
  });
});

// GET /categories/:id - display a specific category with its projects
router.get('/:id', function (req, res) {
  db.category.findById(req.params.id).then(function (category) {
    console.log(category);
    category.getProjects().then(function (projects) {
      res.render('categories/show', { category: category, projects: projects })
    });
  });
});


module.exports = router;
