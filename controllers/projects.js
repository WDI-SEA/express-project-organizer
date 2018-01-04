var express = require('express');
var db = require('../models');
var async =require("async");
var router = express.Router();

// POST /projects - create a new project
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

router.post("/", function(req, res){
  var categories = [];
  if(req.body.categories){
    categories = req.body.categories.split(",");
  }
  db.project.create(req.body).then(function(createdProject){
    if(categories.length > 0){
      async.forEach(categories, function(c, callback){
        //add cat to cat table
        db.category.findOrCreate({
          where: {name: c.trim()}
        }).spread(function(category, wasCreated){
          if(category){
            //this part adds relationship in join table
            createdProject.addCategory(category);
          }
          //calling this function is like saying it's done
          callback(null);
        })
      }, function(){});
        //happens when all calls have been resolved
        res.redirect("/projects/" + createdProject.id);

    }else{
    res.redirect("/projects/" + createdProject.id);
    }
  }).catch(function(err){
    console.log("err", err);
    res.send("uh oh!");
  });
});





// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  db.category.findAll().then(function(category){
      res.render('projects/new', {category: category});
  })
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
