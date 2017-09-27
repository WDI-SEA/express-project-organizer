var express = require('express');
var db = require('../models');
var router = express.Router();
// POST /projects - create a new project and category
router.post('/', function(req, res) {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  }).then(function(project) {
    db.category.findOrCreate({
      where: {name: req.body.category}
    }).spread(function(category, create) {
      post.addCategory(category).then(function(category) {
      });
    });
    res.redirect('/');
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
});


// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) { //LEADS TO: projects/:id
  db.category.find({
    where: {id: req.params.id}
  }).then(function(category) {
    category.getProjects().then(function(projects) {
      console.log("These projects are category with " + category.name + ":");
      projects.forEach(function(project) {
      console.log("Project title: " + project.id);
      res.render('projects/category', {project: project})

      });
    });
  });
});



  // db.tag.find({
  //   where: {name: "food"}
  // }).then(function(tag) {
  //   tag.getPosts().then(function(posts) {
  //     console.log("These posts are tagged with " + tag.name + ":");
  //     posts.forEach(function(post) {
  //       console.log("Post title: " + post.title);
  //     });
  //   });
  // });



// // GET for posts/tags --- view projects by category
// router.get('/categories/:category', function(req, res) { //LEADS TO: category.ejs view
//   db.category.findOne({ //grab this one tag name
//     where: {name: req.params.category} //where is equals this
//   }).then(function(category) { //and then...
//     category.getPosts().then(function(project) { //we are getting posts back
//       console.log("____________________________________ GET in Controllers/Posts" + posts);
//       res.render('projects/category', {project: project}) // send "posts" variable into the posts/tag.ejs
//     })
//   })
// })

module.exports = router;
