var express = require('express');
var db = require('../models');
var router = express.Router();
var bodyParser = require('body-parser')

// +router.get('/', function(req, res){
// +  db.category.findAll().then(function(categories) {
// +    res.render('categories/index', {categories: categories});
// +    }).catch(function(error) {
// +      res.status(400).render('main/404');
// +  });
// +});
// +router.get('/:id', function(req, res) {
// +  db.category.findOne({
// +    where: {id: req.params.id},
// +    include: [db.project]
// +  }).then(function(category){
// +    res.render('categories/show', {projects: projects, category: category});
// +    }).catch(function(error) {
// +      res.status(400).render('main/404');
// +    });
// +});
// +module.exports = router;

// POST /categories - create a new category
router.post('/', function(req, res) {
  db.category.create({
    name: req.body.name,
  })
  .then(function(category) {
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
  db.category.findAll().then(function(categories) {
    res.render('categories/show', { categories: categories });
  });
});

// // GET /categories/id - display new catgory form
// router.get('/:id', function(req, res) {
//   res.render('categories/edit');
// });

module.exports = router;
