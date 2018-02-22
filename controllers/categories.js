var express = require('express');
var db = require('../models');
var router = express.Router();

router.route('/')
  // GET /categories
  .get(function(req, res) {
    db.category.findAll().then(function(categories) {
      res.render('categories/index', {categories: categories});
    });
  })

  // PUT /categories

  // DELETE /categories


// END '/' route

router.route('/:id')
  // GET
  .get(function(req, res) {
    db.category.findOne({
      where: {id: req.params.id},
      include: [db.project]
    }).then(function(category) {
      res.render('categories/show', {category: category});
    });
  });
// END '/:id'

module.exports = router;
