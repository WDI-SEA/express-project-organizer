var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  // already saving project, we have to create two more
  // use find or create for two new ones
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    db.category.findOrCreate({
      where: {category: req.body.category}
    }).spread(function(category, created) {
      project.addCategory(category).then(function(category) {
        res.redirect('/');
      })
    })
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// ask what spead does, and addTag or addCategory? where does this come from



// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
});

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.find({
    where: { id: req.params.id },
    include: [db.category]
  })
  .then(function(project) {
    console.log('heres project.categories[0].category', project.categories[0].category);
    if (!project) throw Error();
    res.render('projects/show', { project: project });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
