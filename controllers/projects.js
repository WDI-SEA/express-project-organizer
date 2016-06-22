var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    // console.log(project.get());
    db.category.findOrCreate({
      where: { name: req.body.categoryInput }
    })
    .spread(function(cat, created) {
      // console.log(cat.get());
      project.addCategory(cat);
    });
    res.redirect('/');
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
});

// POST from form action/projects/edit/<project.id>
router.post("/edit/:id", function(req, res) {
  // console.log(req.body);
  db.project.update({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(function(projId){
    console.log(projId)
    db.category.findOrCreate({
      where: { name: req.body.categoryInput }
    }).spread(function(cat, created) {
      // console.log(cat)
      db.project.find({
        where: { id: projId }
      })
      .then(function(project){
        console.log(project)
        project.addCategory(cat);
      });
    });
    res.redirect("/");
  })
  .catch(function(error) {
    res.send("error on edit");
  })
}); // end POST

// GET /projects/edit/:id
router.get("/edit/:id", function(req, res) {
  db.project.find({
    where: { id: req.params.id },
    include: [db.category]
  })
  .then(function(project) {
    // res.send(project);
    res.render("projects/edit.ejs", { project: project })
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
})

// GET /projects/:id - display a specific project
router.get('/:id', function(req, res) {
  db.project.find({
    where: { id: req.params.id },
    include: [db.category]
  })
  .then(function(project) {
    // res.send(project);
    if (!project) throw Error();
    res.render('projects/show', { project: project });
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

module.exports = router;
