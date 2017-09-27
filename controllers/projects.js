var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
// router.post('/', function(req, res) { //send category here from new.ejs
//   db.project.create({
//     name: req.body.name,
//     githubLink: req.body.githubLink,
//     deployedLink: req.body.deployedLink,
//     description: req.body.description
//   })
//   .then(function(project) {
//     res.redirect('/');
//   })
//   .catch(function(error) {
//     res.status(400).render('main/404');
//   });
// });

router.post("/", function(req, res){
  db.project.findOrCreate({
      where: {
        name: req.body.name,
        githubLink: req.body.githubLink,
        deployedLink: req.body.deployedLink,
        description: req.body.description
      }
  }).spread(function(project, created){
    //reference the category tag
    db.category.findOrCreate({
      where: {name: req.body.category}
    }).spread(function(category, created){
      project.addCategory(category).then(function(category){
        console.log(category, "added to ", project);
      });
    });
  });
});

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  //get the post from projects
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
