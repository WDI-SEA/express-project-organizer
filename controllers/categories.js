const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /categories - show ALL the categories that exist
router.get('/', function(req, res) {
  db.category.findAll({
    include: [db.project],
    through: {
      attributes: [projectId],
      where: {completed: true}
    }
  }).then(function(categories) {
    console.log(categories);
    res.render('authors/index', {categories});
  });
});
// router.get('/', function(req, res) {
//   db.category.find({
//     where: {name: req.body.name}
//   }).then(function(projects) {
//     projects.forEach(function(project) {
//       return project.name;
//     })
//     res.render('categories/index', {categories});
//   });
// });

//GET /categories/:id - show a specific category and all the projects with that category
db.project.find({
  where: {name: req.param.name}
}).then(function(project) {
  project.getCategories().then(function(categories) {
    console.log("These categories are tagged with " + project.name + ":");
    categories.forEach(function(category) {
      console.log("Post title: " + category.name);
    });
  });
});

// POST /tags - post the tags
// router.post('/', function(req, res) {
//   db.project.findByPk(parseInt(req.body.projectId)).then(function(project) {
//     db.category.findOrCreate({
//       where: {
//         name: req.body.name
//       }
//     }).spread(function(category, created) {
//       if (!created) console.log("🐝It was not created!");
//       project.addTag(category).then(function(category) {
//         console.log(`${category} added to ${project}`);
//         res.redirect('/projects/' + req.body.projectId);
//       })
//     })
//   })
// });



module.exports = router;