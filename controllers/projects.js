var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');

// POST /projects - create a new project
router.post('/', function(req, res) {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  }).then(function(project) {
    
    var catArray = req.body.category.split(','); // separate categories into array
    
    var addCategory = function(catName, callback) {
      db.category.findOrCreate({
        where: {name: catName}
      }).spread(function(category, created) {
          project.addCategory(category);
        }).then(function(category) {
        });
    }
    
    // async call to create each category in the database
    async.concat(catArray, addCategory, function(err, results) {
      console.log('Done with async calls!');
    });
    results.redirect('/');
  });
});

// Original post route that works for one single category
// POST /projects - create a new project
// router.post('/', function(req, res) {
//   db.project.create({
//     name: req.body.name,
//     githubLink: req.body.githubLink,
//     deployedLink: req.body.deployedLink,
//     description: req.body.description
//   }).then(function(project) {
//     db.category.findOrCreate({
//       where: {name: req.body.category}
//     }).spread(function(category, created) {
//       project.addCategory(category).then(function(category) {
//         console.log("Category", category, "added to post.");
//         res.redirect('/');
//       });
//     });
//   }).catch(function(error) {
//     res.status(400).render('main/404');
//   });
// });

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
});

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.find({
    where: { id: req.params.id },
    include: [db.category]
  }).then(function(project) {
    if (!project) throw Error();
    res.render('projects/show', {project: project});
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
