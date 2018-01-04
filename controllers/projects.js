var express = require('express');
var async = require("async");
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  var categories = [];
  if(req.body.categories) {
    categories = req.body.categories.split(",");
  }
  db.project.create(req.body).then(function(createdProject) {
    console.log("this is the project", createdProject);
    if(categories.length > 0) {
      async.forEach(categories, function(c, callback) {
        db.category.findOrCreate({
          where: {content: c.trim()}
        }).spread(function(category, wasCreated) {
          if(category) {
            createdProject.addCategory(category);
          }
          callback();
        })
      }, function() {
        res.redirect("/projects/" + createdProject.id);
      });
    } else {
      res.redirect("/projects/" + createdProject.id);
    }
  }).catch(function(error) {
    res.status(400).render("main/404");
  });
});



// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
  //also accepts category
});

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.findOne({
    where: {id: req.params.id},
    include: [db.category]
  }).then(function(project) {
    res.render('projects/show', { project: project });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

router.get("/:id", function(req, res) {
  db.article.findOne({
    where: {id: req.params.id},
    include: [db.author, db.comment, db.tag]
  }).then(function(article) {
    res.render("articles/single", {article: article});
  });
});

module.exports = router;
