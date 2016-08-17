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
  },
  include: [db.category]
  }).spread(function(project, created) {
    db.category.findOrCreate({
      where: {name: req.body.category} //where do the key: parameter
    }).spread(function(category, created){
      console.log(category.get());
      if(category){
        project.addCategory(category);
      }
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

//GET /categories

//GET categories/:id
// db.category.find({
//   where: {name: req.params.categoryId}
// }).then(function(category){
//   category.getProjects().then(function(project){
//     console.log('These posts are tagged with ' + category.name);
//     projects.forEach(function(project){
//       console.log('Post title: ' + project.title);
//     });
//   });
// });

module.exports = router;
