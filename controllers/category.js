var express = require('express');
var db = require('../models');
var router = express.Router();

// show all category
router.get('/', function(req, res) {
  db.category.findAll()
        .then(function(projects) {
          res.render('main/index', { category: category });
        })
        .catch(function(error) {
          res.status(400).render('main/404');
        });
});

// GET /projects/new - display form for creating a new project
// page that has form for creating a new project:


// GET /projects/:id - display a specific project
// page that shows a specific project
router.get('/:id', function(req, res) {
  db.category.find({
    where: { id: req.params.id },
    include: [db.category]
  })
  .then(function(project) {
    if (!category) throw Error();
    res.render('category/show', { category: category });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
