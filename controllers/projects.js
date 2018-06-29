var express = require('express');
var db = require('../models');
var async = require('async');
var router = express.Router();


// GET /projects/new - display form for creating a new project
router.get('/new', function(req, res) {
  res.render('projects/new');
});

// POST /posts - create a new post
router.post('/', function(req, res) {
  // first, create a new post
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployedLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(function(project) {
    // then create/find a new tag
    let catArray = req.body.catName.split(', ');

    var findOrCreate = function(catName, callback) {
      db.category.findOrCreate({
        where: {name: catName}
      }).spread(function(cat, created) {
        // add that tag to the post from above
        project.addCategory(cat).then(function(cat) {
          console.log(created)
        });
      });
    };

    async.concat(catArray, findOrCreate);

    res.redirect('/');
  }).catch(function(error) {
    res.status(400).render('main/404');
  });
});

// // POST /posts - create a new post
// router.post('/', function(req, res) {
//   // first, create a new post
//   db.project.create({
//     name: req.body.name,
//     githubLink: req.body.githubLink,
//     deployedLink: req.body.deployedLink,
//     description: req.body.description
//   })
//   .then(function(project) {
//     // then create/find a new tag
//     db.category.findOrCreate({
//       where: {name: req.body.catName}
//     }).spread(function(cat, created) {
//       // add that tag to the post from above
//       project.addCategory(cat).then(function(cat) {
//         console.log(cat + 'added to ' + project);
//         res.redirect('/');
//       });
//     });
//   }).catch(function(error) {
//     res.status(400).render('main/404');
//   });
// });


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

// DELETE /projects/:id - delete project
router.delete('/:id', function(req, res) {
  db.project.destroy({
    where: {id: req.params.id}
  }).then(function(data) {
    res.sendStatus(200);
  })
});

// router.delete('/:id', function(req, res) {
//   db.project.findById(req.params.id).then(function(proj) {
//     proj.getCategory().then(function(cat) {
      
//     })
//   });
// });


// router.delete('/:id', function(req, res) {
//   db.project.find({
//     where: {id: req.params.id},
//     incude: [{
//       model: category,
//       through: {
//         attributes: [categoryId, projectId],
//       }
//     }]
//   }).then(function(project) {

//   })
// });

module.exports = router;
