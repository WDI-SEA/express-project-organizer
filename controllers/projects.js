var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();

// POST /projects - create a new project

router.post('/', function(req, res) {
  // Change my comma-separated tags into an array of tags
  var categories = [];
  if(req.body.categories){
    categories = req.body.categories.split(',');
  }

  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    // Handle adding the tags, if there are any
    if(categories.length > 0){
      // Add some tags
      // Make a loop through the tag array
      async.forEach(categories, function(c, callback){
        // This is the iterator function
        // Add the tag to the tags table
        db.category.findOrCreate({
          where: {name: c.trim()}
        }).spread(function(newCategory, wasCreated){
          // Add the relationship between the post and tag in the posts_tags table
          project.addCategory(newCategory).then(function(){
            callback(); // This says that it's done!
          });
        });
      }, function(){
        // This is the function that runs when everything is resolved/done
        // Redirect to post page
        res.redirect('/');
      });
    }
    else {
      // No tags to add, just redirect to post page
      res.redirect('/');
    }
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
