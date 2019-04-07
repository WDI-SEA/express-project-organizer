var express = require('express');
var db = require('../models');
var router = express.Router();

// // POST /projects - create a new project
// router.post('/', function(req, res) {
//   db.project.create({
//     name: req.body.name,
//     githubLink: req.body.githubLink,
//     deployedLink: req.body.deployedLink,
//     description: req.body.description
//   })
//   .then(function(project) {
//     project.addCategory(category).then(function(category) {
//       res.redirect('/projects/'+ project.id);
//     });
//   })
//   .catch(function(error) {
//     console.log(error);
//     res.status(400).render('main/404');
//   });
// });

// POST /projects - create a new project
router.post('/', function(req, res) {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    db.category.findOrCreate({
      where: {name: req.body.name}
    }).spread(function(category, created) {
      project.addCategory(category).then(function(category) {
        res.redirect('/projects/'+ project.id);
      });
    });
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

// DELETE /projects/:id - delete a specific project
router.delete('/:id', function(req, res) {
  db.project.destroy({
    where: {id: parseInt(req.params.id)}
  }).then(function(){
    res.redirect('/projects');
  });
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
