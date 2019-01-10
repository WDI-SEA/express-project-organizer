var async = require('async');
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
//     res.redirect('/');
//   })
//   .catch(function(error) {
//     res.status(400).render('main/404');
//   });
// });

router.post('/', function(req, res){
  db.project.create(req.body).then(function(newProject){
    var categories = [];
    if (req.body.category){
      categories = req.body.category.split(",")
    }
    if(categories.length>0){
      async.forEach(categories, function(t, done){
        db.category.findOrCreate({
          where: {name: t.trim()}
        }).spread(function(newCategory, wasCreated){
            newProject.addCategory(newCategory).then(function(){
            done();// tell async, this iteration is all finished
            })
            .catch(done);
        })
        .catch(done);
      }, function(){
      res.redirect('/projects/' + newProject.id)
      })
    } else {
      res.redirect('/projects/new' + newProject.id);
      }
    })
    .catch(function(error){
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
    where: { id: req.params.id },
    include: [db.category] // new assoicated table
  })
  .then(function(project) {
    console.log(project);
    if (!project) throw Error();
    res.render('projects/show', { project: project });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
