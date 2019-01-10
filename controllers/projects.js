var express = require('express');
var db = require('../models');
var router = express.Router();
var async = require("async");

// Helper function
function tagArray(req, tagsName) {
  if(req.body[tagsName]){
    return req.body[tagsName].split(",");
  }
}

// POST /projects - create a new project
router.post('/', function(req, res) {
  // Lets get those technologies!
  var categories = [];
  if(req.body.categories){
    categories = req.body.categories.split(",");
  }

  // Make that Project!!
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    if (categories.length>0) {
      async.forEach(categories, (cat, done)=>{
        db.category.findOrCreate({
          where: { name: cat.trim() }
        }).spread((newCat, created)=>{
          project.addCategory(newCat).then(()=>{
            done();
          }).catch(done);
        }).catch(done);
      }, ()=>{
        res.redirect('/');
      }).catch(done);
    }
  }).catch(function(error) {
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

router.delete('/:id', (req, res)=>{
  db.project.destroy({
    where: {id: req.body.id}
  }).then((deletedProject)=>{
    db.categoryProject.destroy({
      where: {projectId: req.body.id}
    }).then((deletedAss)=>{
      res.redirect('/');
    }).catch(function(error) {
      res.status(400).render('main/404');
    });
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
})

router.get('/:id/edit', (req, res)=>{
  db.project.findAll({
    where: { id: req.params.id },
    include: [db.category]
  }).then((project)=>{
    if(!project) throw Error();
    res.render("projects/edit", { project: project[0] });
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
});

router.put('/:id', (req, res)=>{
  var categories = [];
  if(req.body.categories){
    categories = req.body.categories.split(",");
  }

  db.project.update({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description,  
  }, {
    returning: true, where: { id: req.params.id }
  }).then((project)=>{
    if (categories.length>0) {
      async.forEach(categories, (cat, done)=>{
        db.category.findOrCreate({
          where: { name: cat.trim() }
        }).spread((newCat, created)=>{
          project.addCategory(newCat)
          .then(()=>{
            done();
          }).catch(done);
        }).catch(done);
      }, ()=>{
        res.redirect('/projects/'+req.params.id)
      });
    }
  });
})

module.exports = router;
