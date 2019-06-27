const express = require('express');
const router = express.Router();
const db = require('../models');

// GET /tags - index - show ALL the tags


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

//GET /tags/:id - show ONE tag and its associated posts

module.exports = router;