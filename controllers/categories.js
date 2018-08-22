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
  db.category.findOne({
    where: { id: ident },
    include: [db.project]
  }).then(function(foundCategory) {
    // TODO why the F do i have to do this check?!
    if (foundCategory) {
      res.render('categories/show',
        { category: foundCategory });
    }
    else {
      throw 'whatever'
    }
  }).catch(function(err) {
    res.send('a less aggrivating 404 page');
  });
});

module.exports = router;
