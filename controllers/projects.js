var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async');

// POST /projects - create a new project
// router.post('/', function(req, res) {
//   console.log(req.body)

//   db.project.create({
//     name: req.body.name,
//     githubLink: req.body.githubLink,
//     deployedLink: req.body.deployedLink,
//     description: req.body.description,
//     category: req.body.category
//   })
//   .then(function(project) {
    
//     res.redirect('/');
//   })
//   .catch(function(error) {
//     res.status(400).render('main/404');
//   });
// });


router.post('/', function(req, res){
    db.project.create(req.body).then(function(createdProject){
      var cats = [];
      if (req.body.categories){
        cats = req.body.categories.split(",")
      }
      //console.log(cats);
      if(categories.length>0){
        async.forEach(cats, function(t, done){
          db.category.findOrCreate({
            where: {name: t.trim()}
          }).spread(function(newCategory, wasCreated){
              createdProject.addCategory(newCategory).then(function(){
              done();// tell async, this iteration is all finished
              });
          });
        }, function(){
          res.redirect('/')// + createdProject.id)
        })
        
      } else {
        res.redirect('/') //+ createdProject.id);
      }
    
    }).catch(function(err){
        console.log(err);
        res.render('error');
    });
    });
    // else {
    //   res.redirect('/projects/new')
    // }


// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
});

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.find({
    where: { id: req.params.id },
    include: [db.project, db.category]
  })
  .then(function(project) {
    console.log("project::::::",project)
    if (!project) throw Error();
    res.render('projects/show', { project: project });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
