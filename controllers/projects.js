var express = require('express');
var db = require('../models');
var router = express.Router();



//then save the category on POST /projects



// POST /projects - create a new project
router.post('/', function(req, res) {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    res.redirect('/');
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {

//Add a field that accepts a category, 
db.category.find({
  where: {name: ""}
}).then(function(category) {
  tag.getPosts().then(function(posts) {
    console.log("These posts are tagged with " + tag.name + ":");
    posts.forEach(function(post) {
      console.log("Post title: " + post.title);
    });
  });
});
//End here
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
