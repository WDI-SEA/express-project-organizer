var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  db.project.findOrCreate({
    where: {
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployedLink: req.body.deployedLink,
      description: req.body.description
    }
  })
  .spread((project, wasCreated)=>{
    // add the category name to the category table and // create the association??
    db.category.findById(req.params.id)
    .then((results)=>{
      res.redirect('/');
    })
    .catch((error)=>{
      console.log('ERROR!', error);
      res.send('Check your logs!')
    })
  })
  .catch(function(error) {
    console.log(error);
    res.status(400).render('main/404');
  });
});

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
});

// Delete a project route
router.delete('/:id', (req, res)=>{
  db.project.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((deleted)=>{
    res.redirect('/');
  })
  .catch((error)=>{
    console.log('ERROR:', error)
  })
})

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
