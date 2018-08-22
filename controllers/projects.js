var express = require('express');
var db = require('../models');
var router = express.Router();

// POST /projects - create a new project
router.post('/', function(req, res) {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description,
    category: req.body.category
  })
  .then(function(project) {
    res.redirect('/');
  })
  .catch(function(error) {
    res.status(400).render('main/404');
  });
});

// GET /projects/new - display form for creating a new project
// router.get('/new', function(req, res) {
//   db.category.findOrCreate(req.body).then(function(createdCategory){
//   res.render('projects/new');
// }).catch(function(err){
//   console.log('error', err);
//   res.render('404');
// });
// });

router.get('/categories', function(req, res) {
  console.log(req.body);
  if (req.body.projectId >=0) {
  db.project.create(req.body).then(function(createdProject){
    var categorys = [];
    if(req.body.categorys){
      categorys = req.body.categorys.split(',');
    }
    if(categorys.length >0){
      // loop through tags, create if needed then add relation in jion table
      async.forEach(categorys, function(c, done){
        // this code runs for each individual tag we need to add
          db.category.findOrCreate({
            where: {name:c.trim()}
          }).spread(function(newCategory, wasCreated){
            createdProject.addCategory(newCategory).then(function(){
            done(); // tells async this iteration is all finished
          });
        });
        }, function(){
          // this code runs when everything is 100% done
          res.redirect('/projects/' + createdProject.id);
      });

    } else {
      res.redirect('/projects/' + createdProject.id);
    }
  }).catch(function(err){
    console.log(err);
    res.render('error')
  })
}
else {
  res.redirect('/projects/new')
}
});

router.get('/categories', function(req, res){
  res.render('projects/categories')
});

// router.get('/categories/:id', function(req, res){
// })

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
