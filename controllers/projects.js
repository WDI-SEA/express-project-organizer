var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project

router.post('/', function(req, res) {
  // console.log('this route works');
  db.project.findOrCreate(
    {
      where: {
        name: req.body.name,
        githubLink: req.body.githubLink,
        deployedLink: req.body.deployedLink,
        description: req.body.description
      }
    })
  // object and/or metadata is returned from findOrCreate
  // spread apart
  // project param refers to the above section of the function
  .spread(function(project, createMetaData) {
    // console.log('this spread section of the function works');
    db.category.findOrCreate({
      where: {
        name: req.body.categoryFormData
      }
    })
    // object and/or metadata is returned from findOrCreate
    // spread apart
    // category param refers to the above section of the function
    .spread(function(category, created) {
      project.addCategory(category);
      // this is a helper function created by sequelize (addCat)
    })
    .then(function(project) {
      res.redirect('/');
    })
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  })
});

// renders new.ejs
router.get('/new', function(req, res) {
  res.render('projects/new.ejs');
});

// GET /projects/:id - display a specific project by ID name
router.get('/:id', function(req, res) {
  db.project.find({
    where: { id: req.params.id }
  })
  .then(function(project) {
    if (!project) throw Error();
    res.render('projects/show.ejs', { project: project });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
