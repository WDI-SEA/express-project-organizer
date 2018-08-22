var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  console.log('name sent:', req.body.name);
  console.log('github:', req.body.githubLink);
  console.log('deploy:', req.body.deployedLink);
  console.log('categories sent:', req.body.categories);
  console.log('desc:', req.body.description);
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    console.log('reached start of promise for new proj');
    // do category stuff
    var categories = [];
    if (req.body.categories) {
      console.log('category field is not empty');
      categories = req.body.categories.split(' ');
    }
    categories.forEach(function(cat) {
      db.category.findOrCreate({
        where: { name: cat.trim() }
      }).spread(function(newCat, wasCreated) {
        project.addCategory(newCat);
      });
    });
    res.redirect('/');
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
});

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.find({
    where: { id: req.params.id }
  })
  .then(function(project) {
    if (!project) throw Error();
    res.render('projects/show', { project: project });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
