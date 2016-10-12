var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
    var categories = [];
    if(req.body.categories){
      var categories = req.body.categories.split(",");        
    }
    db.project.create({
      id: req.params.id,
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployedLink: req.body.deployedLink,
      description: req.body.description
      }).then(function(project){
          if(categories.length > 0){
            for(var i = 0; i < categories.length; i++){
              db.category.findOrCreate({
                where: {name: categories[i]}
              }).spread(function(category, wasCreated){ //tells you whether tag was created
                if(category){ //addTag is a HELPER FUNCITON along with createArticle
                  project.addCategory(category); // This part creates the relation in the map table
                }
              }); //End spread
            } // End loop
          } // End if

    console.log(project.get());
          res.redirect("/");
      }); //End then() for createArticle
         
          }); //End then() for author 

 
  // console.log(req.body);
  // res.send("Testing my post route, yay it worked");


  // db.project.createArticle({
  //   name: req.body.name,
  //   githubLink: req.body.githubLink,
  //   deployedLink: req.body.deployedLink,
  //   description: req.body.description,
  // })



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

module.exports = router;
