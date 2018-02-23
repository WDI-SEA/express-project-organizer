var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require('async')

// POST /projects - create a new project
router.post('/', function(req, res) {
  //change my comma separated tags into an array of categories
  var categories = [];
  if(req.body.categories){  //only do somethig if tag was not empty
    categories = req.body.categories.split(',');
  }

  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
  //handling adding the tags, if there are any
    if (categories.length > 0) {
      //add some tags
      //make a loop through the tag array
      //add the tag to the tag table
      async.forEach(categories, function(t, callback){  //'t' is for tag
        //this is the iterater function
        db.category.findOrCreate({
          where: {name: t.trim()}
        }).spread(function(newCategory, wasCreated) {
          //add the relationship between the post and tag in the posts_tags table
          project.addCategory(newCategory).then(function() {
            callback(); //this will tell us it is done--b/c async line 26
          })
        })
      }, function(){
         //this is the function that runs when everything is resolved
         res.redirect('/projects/' + project.id);
      })
     
      
      //redirect to post page
    } else {
      //no tags to add, just redirect to post page
        res.redirect('/projects/' + project.id);    }

    
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

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.find({
    where: { id: req.params.id },
    include: [db.category]
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
